require 'rails_helper'

feature 'User Authentication Flow', js: true do
  let(:user) { create(:user) }

  scenario 'user signs up' do
    visit new_user_registration_path

    within('#new_registration') do
      fill_in 'user_email', with: 'newuser@example.com'
      fill_in 'user_username', with: 'newuser'
      fill_in 'user_password', with: 'Password!1'
      fill_in 'user_password_confirmation', with: 'Password!1'
      click_button 'Sign up'
    end

    expect(page).to have_content('Sign out')
  end

  scenario 'user logs in' do
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button 'Log in'
    end

    expect(page).to have_content("Welcome #{user.username}!")
  end

  scenario 'user logs out' do
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button 'Log in'
    end

    click_button 'Sign out'
    expect(page).to have_content('Log in')
  end

  scenario 'user resets password' do
    #Not implemented
  end
end
