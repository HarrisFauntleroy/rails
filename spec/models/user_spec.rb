# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user, id: 1) }
  let(:moderator_user) { create(:user, moderator: true) }
  let(:admin_user) { create(:user, admin: true) }

  describe 'factory' do
    it 'is valid' do
      expect(user).to be_valid
    end
  end

  describe 'validations' do
    context 'when validating usernames' do
      it 'is valid with a unique username' do
        expect(build(:user, username: 'uniqueuser')).to be_valid
      end

      it 'is invalid without a username' do
        invalid_user = build(:user, username: nil)
        expect(invalid_user).not_to be_valid
        expect(invalid_user.errors[:username]).to include("can't be blank")
      end

      it 'is invalid with an overly long username' do
        expect(build(:user, username: 'a' * 256)).not_to be_valid
      end

      it 'is invalid with a duplicate username' do
        create(:user, username: 'duplicateuser')
        expect(build(:user, username: 'duplicateuser')).not_to be_valid
      end
    end

    context 'when validating emails' do
      it 'is_valid with a valid email' do
        expect(build(:user, email: 'example@test.com')).to be_valid
      end

      it 'is invalid without a valid email' do
        invalid_user = build(:user, email: 'invalidemail')
        expect(invalid_user).not_to be_valid
        expect(invalid_user.errors[:email]).to include('is invalid')
      end

      it 'is invalid without an email' do
        invalid_user = build(:user, email: nil)
        expect(invalid_user).not_to be_valid
        expect(invalid_user.errors[:email]).to include("can't be blank")
      end

      it 'is invalid with a duplicate email' do
        create(:user, email: 'duplicate@example.com')
        expect(build(:user, email: 'duplicate@example.com')).not_to be_valid
      end
    end

    context 'when validating passwords' do
      it 'is valid with all required elements' do
        expect(build(:user, password: 'ValidPassword!1')).to be_valid
      end

      it 'is invalid without a password' do
        expect(build(:user, password: nil)).not_to be_valid
      end

      it 'is invalid with a short password' do
        expect(build(:user, password: '1234567')).not_to be_valid
      end

      it 'is invalid without a special character' do
        expect(build(:user, password: 'Password1')).not_to be_valid
      end

      it 'is invalid without a number' do
        expect(build(:user, password: 'Password!')).not_to be_valid
      end

      it 'is invalid without a capital letter' do
        expect(build(:user, password: 'password!1')).not_to be_valid
      end
    end

    context 'when validating timezones' do
      it 'is valid with a valid timezone' do
        expect(build(:user, timezone: 'Eastern Time (US & Canada)')).to be_valid
      end

      it 'is invalid with an invalid timezone' do
        expect(build(:user, timezone: 'Invalid Timezone')).not_to be_valid
      end
    end

    context 'when validating latitudes' do
      it 'is valid with a valid latitude' do
        expect(build(:user, latitude: 40.7128)).to be_valid
      end

      it 'is invalid with an invalid latitude' do
        expect(build(:user, latitude: 200)).not_to be_valid
      end
    end

    context 'when validating longitudes' do
      it 'is valid with a valid longitude' do
        expect(build(:user, longitude: -74.0060)).to be_valid
      end

      it 'is invalid with an invalid longitude' do
        expect(build(:user, longitude: 200)).not_to be_valid
      end
    end
  end

  describe 'associations' do
    it 'has many categories' do
      expect { user.categories << create(:category, user:) }.to change(user.categories, :count).by(1)
    end

    it 'has many forums' do
      expect { user.forums << create(:forum, user:) }.to change(user.forums, :count).by(1)
    end

    it 'has many topics' do
      expect { user.topics << create(:topic, user:) }.to change(user.topics, :count).by(1)
    end

    it 'has many comments' do
      expect { user.comments << create(:comment, user:) }.to change(user.comments, :count).by(1)
    end
  end

  describe 'user roles' do
    it 'defaults to a regular user' do
      expect(user.admin).to be false
      expect(user.moderator).to be false
    end

    it 'can be an admin' do
      expect(admin_user.admin).to be true
    end

    it 'can be a moderator' do
      expect(moderator_user.moderator).to be true
    end
  end

  describe 'birthday methods' do
    shared_context 'birthday setup' do
      let(:today) { Date.today }
      let(:tomorrow) { today + 1 }
      let(:yesterday) { today - 1 }
    end

    describe '#todays_birthdays' do
      include_context 'birthday setup'

      before do
        create(:user, date_of_birth: today)
        create(:user, date_of_birth: tomorrow)
        create(:user, date_of_birth: yesterday)
        create(:user, date_of_birth: nil)
        create(:user, date_of_birth: today) # Second user with today's birthday for multiple test
      end

      it 'returns only today\'s birthdays' do
        expect(User.todays_birthdays.count).to eq(2)
      end

      it 'does not return upcoming or past birthdays' do
        expect(User.todays_birthdays).not_to include(User.find_by(date_of_birth: tomorrow))
        expect(User.todays_birthdays).not_to include(User.find_by(date_of_birth: yesterday))
      end

      it 'does not count users without a date of birth' do
        expect(User.todays_birthdays).not_to include(User.find_by(date_of_birth: nil))
      end
    end

    describe '#upcoming_birthdays' do
      include_context 'birthday setup'

      before do
        create(:user, date_of_birth: tomorrow)
        create(:user, date_of_birth: today)
        create(:user, date_of_birth: yesterday)
        create(:user, date_of_birth: nil)
        create(:user, date_of_birth: tomorrow + 1) # Second user with an upcoming birthday
      end

      it 'returns only upcoming birthdays' do
        expect(User.upcoming_birthdays.count).to eq(2)
      end

      it 'does not return today\'s or past birthdays' do
        expect(User.upcoming_birthdays).not_to include(User.find_by(date_of_birth: today))
        expect(User.upcoming_birthdays).not_to include(User.find_by(date_of_birth: yesterday))
      end

      it 'does not count users without a date of birth' do
        expect(User.upcoming_birthdays).not_to include(User.find_by(date_of_birth: nil))
      end
    end
  end

  describe 'Crud methods' do
    it 'can be created' do
      new_user = build(:user)
      new_user.save

      expect(new_user).to be_persisted
    end

    it 'can be read' do
      created_user = create(:user)

      expect(User.find(created_user.id)).to eq(created_user)
    end

    it 'can be updated' do
      user_to_update = create(:user, username: 'Old Name')
      user_to_update.update(username: 'Updated Name')

      expect(user_to_update.reload.username).to eq('Updated Name')
    end

    it 'can be deleted' do
      user_to_delete = create(:user)
      user_id = user_to_delete.id
      user_to_delete.destroy

      expect(User.where(id: user_id)).to be_empty
    end
  end
end
