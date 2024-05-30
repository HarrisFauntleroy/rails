# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }
  let(:moderator_user) { build(:user, moderator: true) }
  let(:admin_user) { build(:user, admin: true) }

  describe 'factory' do
    it { expect(user).to be_valid }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_uniqueness_of(:username) }

    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to allow_value('example@test.com').for(:email) }
    it { is_expected.not_to allow_value('invalidemail').for(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }

    it { is_expected.to validate_presence_of(:password) }
    it { is_expected.to validate_length_of(:password).is_at_least(8) }
    it { is_expected.to validate_confirmation_of(:password) }

    it {
      is_expected.to validate_numericality_of(:latitude).is_greater_than_or_equal_to(-90).is_less_than_or_equal_to(90).allow_nil
    }
    it {
      is_expected.to validate_numericality_of(:longitude).is_greater_than_or_equal_to(-180).is_less_than_or_equal_to(180).allow_nil
    }

    describe 'timezones' do
      it 'validates inclusion of a valid timezone' do
        expect(build(:user, timezone: 'Eastern Time (US & Canada)')).to be_valid
        expect(build(:user, timezone: 'Invalid Timezone')).not_to be_valid
      end
    end
  end

  describe 'associations' do
    it { is_expected.to have_many(:categories).dependent(:destroy) }
    it { is_expected.to have_many(:forums).dependent(:destroy) }
    it { is_expected.to have_many(:topics).dependent(:destroy) }
    it { is_expected.to have_many(:comments).dependent(:destroy) }
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
        create(:user, date_of_birth: today)
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
        create(:user, date_of_birth: tomorrow + 1)
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
end
