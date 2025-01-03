# frozen_string_literal: true

require 'rails_helper'

describe 'Categories', type: :system do
  let(:admin) { create(:user, :admin, id: 1) }

  it 'admin creates a category' do
    # Admin logs in
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: admin.email
      fill_in 'user_password', with: admin.password
      click_on 'Sign in'
    end

    # Admin creates a category
    find('#forums_link').click
    find('#new_category_link').click

    within('#new_category') do
      fill_in 'category_name', with: 'Testing Category'
      click_on 'Submit'
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
      click_on 'Submit'
    end

    # Admin sees the updated category
    expect(page).to have_text('New Category Name')

    # Admin deletes the category
    visit current_path

    accept_confirm do
      find('#delete_category_button').click
    end

    expect(page).not_to have_text('New Category Name')
  end

  it 'regular user cannot create a category' do
    # Regular user logs in
    user = create(:user)
    visit root_path

    within('#new_session') do
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_on 'Sign in'
    end

    # Regular user cannot create a category
    expect(page).not_to have_css('#new_category_link')
  end
end
