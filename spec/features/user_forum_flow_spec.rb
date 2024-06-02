# frozen_string_literal: true

require 'rails_helper'

describe 'User Authentication Flow', js: true do
  let(:user) { create(:user) }

  it 'user logs in' do
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button 'Log in'
    end

    expect(page).to have_text("Welcome #{user.username}!")
  end
end
