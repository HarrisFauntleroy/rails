# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'shared/_sidebar', type: :view do
  describe 'for a guest user' do
    before(:each) do
      @user = create(:user, id: 1)
    end
  end

  describe 'for a signed in user' do
    before(:each) do
      @user = create(:user, id: 1)
      sign_in @user
    end

    it 'should contain "Welcome" section' do
      render
      expect(rendered).to have_content(t('welcome'))
    end

    it 'displays the user\'s username' do
      render
      expect(rendered).to match(@user.username)
      expect(rendered).to have_content(t('registered_member'))
      expect(rendered).to have_content(t('devise.sign_out'))
    end
  end

  describe 'for a moderator' do
    before(:each) do
      @user = create(:user, id: 1, moderator: true)
      sign_in @user
    end

    it 'should contain "Welcome" section' do
      render
      expect(rendered).to have_content(t('welcome'))
    end

    it 'displays the user\'s username' do
      render
      expect(rendered).to match(@user.username)
      expect(rendered).to have_content(t('registered_member'))
      expect(rendered).to have_content(t('devise.sign_out'))
    end
  end

  describe 'for an admin' do
    before(:each) do
      @user = create(:user, id: 1, admin: true)
      sign_in @user
    end

    it 'should contain "Welcome" section' do
      render
      expect(rendered).to have_content(t('welcome'))
    end

    it 'displays the user\'s username' do
      render
      expect(rendered).to match(@user.username)
      expect(rendered).to have_content(t('registered_member'))
      expect(rendered).to have_content(t('devise.sign_out'))
    end
  end
end
