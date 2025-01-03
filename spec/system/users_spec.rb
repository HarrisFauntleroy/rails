# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :system do
  # Shared contexts
  shared_context 'when user exists' do
    let(:user) { create(:user) }
  end

  # Helper methods
  def fill_in_registration_form(email:, password:, username:)
    within('form#new_registration') do
      fill_in 'Email', with: email
      fill_in 'Username', with: username
      fill_in 'Password', with: password
      fill_in 'Password confirmation', with: password
      click_button I18n.t('devise.sign_up')
    end
  end

  def fill_in_login_form(email:, password:)
    within('form#new_session') do
      fill_in 'Email', with: email
      fill_in 'Password', with: password
      click_button I18n.t('devise.sign_in')
    end
  end

  def expect_successful_authentication
    aggregate_failures do
      expect(page).to have_current_path(root_path)
      expect(page).to have_button(I18n.t('devise.sign_out'))
      expect(page).not_to have_link(I18n.t('devise.sign_up'))
      expect(page).not_to have_link(I18n.t('devise.sign_in'))
    end
  end

  describe 'Sign up' do
    before { visit new_user_registration_path }

    context 'with valid credentials' do
      it 'creates a new user account' do
        fill_in_registration_form(
          email: 'newuser@example.com',
          password: 'Password!1',
          username: 'newuser'
        )

        expect_successful_authentication
        expect(page).to have_text(I18n.t('devise.registrations.signed_up'))
      end
    end

    context 'with invalid credentials' do
      it 'shows validation errors' do
        fill_in_registration_form(
          email: 'email@gmail.com',
          password: 'short',
          username: ''
        )

        aggregate_failures do
          expect(page).to have_text("Username can't be blank")
          expect(page).to have_text("Username is too short (minimum is 3 characters)")
          expect(page).to have_text("Password is too short (minimum is 8 characters)")
        end
      end
    end
  end

  describe 'Sign in' do
    include_context 'when user exists'
    before { visit new_user_session_path }

    context 'with valid credentials' do
      it 'signs in the user' do
        fill_in_login_form(
          email: user.email,
          password: user.password
        )

        expect_successful_authentication
        expect(page).to have_text(I18n.t('devise.sessions.signed_in'))
      end
    end

    context 'with invalid credentials' do
      it 'shows error message' do
        fill_in_login_form(
          email: user.email,
          password: 'wrong_password'
        )

        expect(page).to have_text("Invalid Email or password.")
      end
    end
  end

  describe 'Sign out' do
    include_context 'when user exists'

    before do
      sign_in user
      visit root_path
      click_button I18n.t('devise.sign_out')
    end

    it 'signs out the user' do
      aggregate_failures do
        expect(page).to have_current_path(root_path)
        expect(page).to have_link(I18n.t('devise.sign_up'))
        expect(page).to have_button(I18n.t('devise.sign_in'))
        expect(page).not_to have_button(I18n.t('devise.sign_out'))
        expect(page).to have_text(I18n.t('devise.sessions.signed_out'))
      end
    end
  end

  describe 'Password reset', :skip do
    it 'allows user to reset password' do
      pending 'Implement password reset functionality'
    end
  end
end