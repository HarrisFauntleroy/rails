# frozen_string_literal: true

require 'rails_helper'

describe 'Category Flow', js: true do
  let(:admin) { create(:user, :admin, id: 1) }

  it 'admin creates a category' do
    # Admin logs in
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: admin.email
      fill_in 'user_password', with: admin.password
      click_button 'Log in'
    end

    # Admin creates a category
    find('#forums_link').click
    find('#new_category_link').click

    within('#new_category') do
      fill_in 'category_name', with: 'Testing Category'
      click_button 'Submit'
    end

    # Admin sees the category
    expect(page).to have_text('Testing Category')
    expect(page).to have_text('Forums')
    expect(page).to have_text('Topics')
    expect(page).to have_text('Replies')
    expect(page).to have_text('Last Comment')
    expect(page).to have_text('Actions')

    # Admin edits the category
    find('#edit_category_link').click

    within('#edit_category') do
      fill_in 'category_name', with: 'New Category Name'
      click_button 'Submit'
    end

    # Admin sees the updated category
    expect(page).to have_text('New Category Name')

    # Admin deletes the category
    reload_page # TODO: reload should not be necessary, the button needs fixing

    accept_confirm do
      find('#delete_category_button').click
    end

    expect(page).not_to have_text('New Category Name')
  end
end
