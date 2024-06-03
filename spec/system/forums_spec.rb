# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Forums', type: :system, js: true do
  let(:user) { create(:user) }
  let(:category) { create(:category) }
  let(:forum) { create(:forum, category: category) }

  before do
    sign_in user
  end

  describe 'Viewing Forums' do
    it 'allows a user to view forums in a category' do
      # Todo
    end
  end

  describe 'Creating Forums' do
    it 'allows an admin to create a forum' do
      # Todo
    end
  end

  describe 'Editing Forums' do
    it 'allows an admin to edit a forum' do
      # Todo
    end
  end

  describe 'Deleting Forums' do
    it 'allows an admin to delete a forum' do
      # Todo
    end
  end
end
