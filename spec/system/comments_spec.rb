# frozen_string_literal: true

require 'rails_helper'

describe 'Comments', type: :system do
  let(:user) { create(:user) }
  let(:topic) { create(:topic, user:) }
  let(:comment) { create(:comment, topic:, user:) }

  before do
    sign_in user
  end

  describe 'Viewing Comments' do
    it 'allows a user to view comments on a topic' do
      # Todo
    end
  end

  describe 'Creating Comments' do
    it 'allows a user to create a comment on a topic' do
      # Todo
    end
  end

  describe 'Editing Comments' do
    it 'allows a user to edit their comment' do
      # Todo
    end
  end

  describe 'Deleting Comments' do
    it 'allows a user to delete their comment' do
      # Todo
    end
  end

  describe 'Replying to Comments' do
    it 'allows a user to reply to a comment' do
      # Todo
    end
  end
end
