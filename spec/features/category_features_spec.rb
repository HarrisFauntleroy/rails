# frozen_string_literal: true

describe 'Category Management', js: true do
  let(:admin) { create(:user, :admin, id: 1) }

  before do
    visit root_path
    within('#new_session') do
      fill_in 'user_email', with: admin.email
      fill_in 'user_password', with: admin.password
      click_button 'Log in'
    end
    find('#forums_link').click
  end

  it 'admin creates a category' do
    find('#new_category_link').click
    within('#new_category') do
      fill_in 'category_name', with: 'Testing Category'
      click_button 'Submit'
    end

    expect(page).to have_text('Testing Category')
  end

  it 'admin edits a category' do
    create(:category, name: 'Testing Category')
    visit forums_path

    find('#edit_category_link').click
    within('#edit_category') do
      fill_in 'category_name', with: 'New Category Name'
      click_button 'Submit'
    end

    expect(page).to have_text('New Category Name')
  end

  it 'admin deletes a category' do
    create(:category, name: 'New Category Name')
    visit forums_path

    accept_confirm do
      find('#delete_category_button').click
    end

    expect(page).not_to have_text('New Category Name')
  end
end
