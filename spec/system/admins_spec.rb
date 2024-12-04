# frozen_string_literal: true

require 'rails_helper'

describe 'Admins', type: :system do
  let(:admin) { create(:user, :admin) }

  before do
    sign_in admin
  end

  it 'admin logs in' do
    visit root_path
    expect(page).to have_text("Welcome #{admin.username}!")
    expect(page).to have_text('Admin')
  end

  describe 'Admin Manages Users' do
    it 'allows admin to activate a user' do
      skip 'Not yet implemented'
    end

    it 'allows admin to deactivate a user' do
      skip 'Not yet implemented'
    end

    it 'allows admin to delete a user' do
      skip 'Not yet implemented'
    end
  end
end
