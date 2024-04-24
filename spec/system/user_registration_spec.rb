require 'rails_helper'

RSpec.describe 'UserRegistrations', type: :system do
  before do
    # driven_by(:selenium, using: :chrome) # for JS testing
    driven_by(:rack_test) # for non-JS testing
    # driven_by(:selenium_chrome) # for headless testing
  end

  it 'allows new users to register' do
    visit new_user_registration_path
    expect(page).to have_text('Sign up')

    within '#new_registration' do
      fill_in 'Email', with: 'test@example.com'
      fill_in 'Username', with: 'testuser'
      fill_in 'Password', with: 'Password!1'
      fill_in 'Password confirmation', with: 'Password!1'
    end

    click_button 'Sign up'
    save_and_open_page
    expect(page).to have_current_path(root_path)
    expect(page).to have_text('Sign out')
  end
end
