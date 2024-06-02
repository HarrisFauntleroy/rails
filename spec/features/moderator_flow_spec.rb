# frozen_string_literal: true

require 'rails_helper'

describe 'Moderator Flow', js: true do
  let(:moderator) { create(:user, :moderator) }

  it 'moderator logs in' do
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: moderator.email
      fill_in 'user_password', with: moderator.password
      click_button 'Log in'
    end

    expect(page).to have_text("Welcome #{moderator.username}!")
    expect(page).to have_text("Moderator")
  end
end
