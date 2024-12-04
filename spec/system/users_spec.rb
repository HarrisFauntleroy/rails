# frozen_string_literal: true

require 'rails_helper'

describe 'Users', type: :system do
  let(:user) { create(:user) }

  describe 'signup' do
    before do
      visit new_user_registration_path
    end

    it 'redirects to root path after successful signup' do
      fill_in_signup_form
      expect(page).to have_current_path(root_path)
    end

    it 'displays logout option after successful signup' do
      fill_in_signup_form
      expect(page).to have_text('Sign out')
    end

    private

    def fill_in_signup_form
      within('#new_registration') do
        fill_in 'user_email', with: 'newuser@example.com'
        fill_in 'user_username', with: 'newuser'
        fill_in 'user_password', with: 'Password!1'
        fill_in 'user_password_confirmation', with: 'Password!1'
        click_on 'Sign up'
      end
    end
  end

  describe 'login' do
    before do
      visit root_path
    end

    it 'displays welcome message after successful login' do
      login_as_user
      expect(page).to have_text("Welcome #{user.username}!")
    end

    private

    def login_as_user
      within('#new_session') do
        fill_in 'user_email', with: user.email
        fill_in 'user_password', with: user.password
        click_on 'Log in'
      end
    end
  end

  describe 'logout' do
    before do
      visit root_path
      login_as_user
    end

    it 'redirects to root path after logout' do
      click_on 'Sign out'
      expect(page).to have_current_path(root_path)
    end

    it 'displays signup option after logout' do
      click_on 'Sign out'
      expect(page).to have_text('Sign up')
    end

    it 'displays login option after logout' do
      click_on 'Sign out'
      expect(page).to have_text('Log in')
    end

    private

    def login_as_user
      within('#new_session') do
        fill_in 'user_email', with: user.email
        fill_in 'user_password', with: user.password
        click_on 'Log in'
      end
    end
  end

  describe 'password reset' do
    it 'user resets password' do
      skip 'Not yet implemented'
    end
  end
end
