# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user, id: 1) }
  let(:moderator_user) { create(:user, moderator: true) }
  let(:admin_user) { create(:user, admin: true) }

  describe 'Factory' do
    it 'is valid' do
      expect(user).to be_valid
    end
  end

  describe 'Validations' do
    context 'when validating emails' do
      it 'is valid with a unique email' do
        expect(build(:user, email: 'unique@test.com')).to be_valid
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
  end

  describe 'Associations' do
    it 'has many categories' do
      expect { user.categories << create(:category, user: user) }.to change(user.categories, :count).by(1)
    end
    
    it 'has many forums' do
      expect { user.forums << create(:forum, user: user) }.to change(user.forums, :count).by(1)
    end

    it 'has many topics' do
      expect { user.topics << create(:topic, user: user) }.to change(user.topics, :count).by(1)
    end

    it 'has many comments' do
      expect { user.comments << create(:comment, user: user) }.to change(user.comments, :count).by(1)
    end
  end

  describe 'User roles' do
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

  describe 'CRUD operations' do
    let(:new_user) { create(:user) }

    it 'can create a user' do
      expect(new_user).to be_valid
    end

    it 'can read a user' do
      expect(User.find(new_user.id)).to eq(new_user)
    end

    it 'can update a user' do
      new_user.update(username: 'new_username')
      expect(new_user.username).to eq('new_username')
    end

    it 'can delete a user' do
      new_user.destroy
      expect(User.exists?(new_user.id)).to be false
    end
  end
end
