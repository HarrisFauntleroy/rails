# frozen_string_literal: true

require 'rails_helper'

describe 'User Authentication Flow', js: true do
  let(:user) { create(:user) }

  it 'user signs up' do
    visit new_user_registration_path

    within('#new_registration') do
      fill_in 'user_email', with: 'newuser@example.com'
      fill_in 'user_username', with: 'newuser'
      fill_in 'user_password', with: 'Password!1'
      fill_in 'user_password_confirmation', with: 'Password!1'
      click_button 'Sign up'
    end

    expect(page).to have_current_path(root_path)
    expect(page).to have_text('Sign out')
  end

  it 'user logs in' do
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button 'Log in'
    end

    expect(page).to have_text("Welcome #{user.username}!")
  end

  it 'user logs out' do
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button 'Log in'
    end

    click_button 'Sign out'
    expect(page).to have_current_path(root_path)
    expect(page).to have_text('Sign up')
    expect(page).to have_text('Log in')
  end

  it 'user resets password' do
    # Not implemented
  end
end
