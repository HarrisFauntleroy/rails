# frozen_string_literal: true

require 'rails_helper'

describe UserPolicy do
  subject { described_class }

  let(:admin) { create(:user, admin: true) }
  let(:user) { create(:user) }

  permissions :index? do
    it 'allows admin to access index' do
      expect(subject).to permit(admin)
    end

    it 'denies non-admin to access index' do
      expect(subject).not_to permit(user)
    end

    it 'denies non-users to access index' do
      expect(subject).not_to permit(nil)
    end
  end

  permissions :show? do
    it 'allows any user to view any user' do
      expect(subject).to permit(user, admin)
    end

    it 'prevents non-user from viewing any user' do
      expect(subject).not_to permit(nil, user)
    end
  end

  permissions :update? do
    it 'allows admin to update any user' do
      expect(subject).to permit(admin, user)
    end

    it 'allows user to update themselves' do
      expect(subject).to permit(user, user)
    end

    it 'prevents user from updating others' do
      expect(subject).not_to permit(user, admin)
    end

    it 'prevents non-users from updating users' do
      expect(subject).not_to permit(nil, user)
    end
  end

  permissions :destroy? do
    it 'allows admin to delete others' do
      expect(subject).to permit(admin, user)
    end

    it 'prevents admin from deleting themselves' do
      expect(subject).not_to permit(admin, admin)
    end

    it 'allows user to delete themselves' do
      expect(subject).to permit(user, user)
    end

    it 'prevents users from deleting others' do
      expect(subject).not_to permit(user, admin)
    end

    it 'prevents non-users from deleting users' do
      expect(subject).not_to permit(nil, user)
    end
  end
end
