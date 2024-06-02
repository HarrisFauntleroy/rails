# frozen_string_literal: true

require 'rails_helper'

describe 'Admin Flow', js: true do
  let(:admin) { create(:user, :admin) }

  it 'admin logs in' do
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: admin.email
      fill_in 'user_password', with: admin.password
      click_button 'Log in'
    end

    expect(page).to have_text("Welcome #{admin.username}!")
    expect(page).to have_text('Admin')
  end
end
