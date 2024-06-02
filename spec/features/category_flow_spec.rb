# frozen_string_literal: true

require 'rails_helper'

describe 'Category Flow', js: true do
  let(:admin) { create(:user, :admin, id: 1) }

  it 'admin creates a category' do
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: admin.email
      fill_in 'user_password', with: admin.password
      click_button 'Log in'
    end

    find('#forums_link').click
    find('#new_category_link').click

    within('#new_category') do
      fill_in 'category_name', with: 'Testing Category'
      click_button 'Submit'
    end

    expect(page).to have_text('Testing Category')
    expect(page).to have_text('Forums')
    expect(page).to have_text('Topics')
    expect(page).to have_text('Replies')
    expect(page).to have_text('Last Comment')
    expect(page).to have_text('Actions') 
  end
end
