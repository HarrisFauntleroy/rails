require 'rails_helper'

RSpec.describe 'UserSessions', type: :system do
  before do
    # driven_by(:selenium, using: :chrome) # for JS testing
    driven_by(:rack_test) # for non-JS testing
    # driven_by(:selenium_chrome) # for headless testing
  end
  it 'allows a user to log in' do
    user = create(:user)
    visit root_path

    within '#new_session' do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
    end

    click_button 'Log in'

    expect(page).to have_current_path(root_path)
    expect(page).to have_text('Sign out')
  end
  it 'allows a user to log out' do
    user = create(:user)
    login_as(user)
    visit root_path

    click_button 'Sign out'

    expect(page).to have_current_path(root_path)
    expect(page).to have_text('Sign up')
  end
end
