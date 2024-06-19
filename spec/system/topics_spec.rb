# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Topics', :js, type: :system do
  let(:user) { create(:user) }
  let(:forum) { create(:forum) }
  let(:topic) { create(:topic, forum:, user:) }

  before do
    sign_in user
  end

  describe 'Viewing Topics' do
    it 'allows a user to view topics in a forum' do
      # Todo
    end
  end

  describe 'Creating Topics' do
    it 'allows a user to create a topic in a forum' do
      # Todo
    end
  end

  describe 'Editing Topics' do
    it 'allows a user to edit their topic' do
      # Todo
    end
  end

  describe 'Deleting Topics' do
    it 'allows a user to delete their topic' do
      # Todo
    end
  end
end
