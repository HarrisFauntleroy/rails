# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Forum, type: :model do
  let(:user) { create(:user, id: 1) }
  let(:forum) { create(:forum, user: user) }
  let(:category) { create(:category, forums: [forum]) }

  it 'has a valid factory' do
    expect(forum).to be_valid
  end

  describe 'validations' do
    it 'is valid with a valid name' do
      forum = build(:forum, name: 'My Forum')
      expect(forum).to be_valid
    end
    it 'is invalid without a name' do
      forum = build(:forum, name: nil)
      expect(forum).to_not be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      expect(forum.user).to eq(forum.user)
    end

    it 'has a parent category' do
      category = create(:category, forums: [forum])
      expect(forum.category).to eq(category)
    end

    it 'is destroyed when its parent category is destroyed' do
      category = create(:category, forums: [forum])
      category.destroy

      expect(Forum.where(id: forum.id)).to be_empty
    end

    it 'is destroyed when its parent user is destroyed' do
      user = create(:user, forums: [forum])
      user.destroy

      expect(Forum.where(id: forum.id)).to be_empty
    end

    it 'can have many topics' do
      topic1 = create(:topic, forum: forum)
      topic2 = create(:topic, forum: forum)

      expect(forum.topics).to include(topic1, topic2)
    end
  end

  describe '#total_comments' do
    it 'returns the total number of comments in the forum' do
      topic = create(:topic, forum: forum)
      create(:comment, topic: topic)
      create(:comment, topic: topic)

      expect(forum.total_comments).to eq(2)
    end

    it 'returns 0 if there are no comments' do
      expect(forum.total_comments).to eq(0)
    end
  end

  describe '#total_topics' do
    it 'returns the total number of topics in the forum' do
      create(:topic, forum: forum)
      create(:topic, forum: forum)

      expect(forum.total_topics).to eq(2)
    end

    it 'returns 0 if there are no topics' do
      expect(forum.total_topics).to eq(0)
    end
  end

  describe '#last_comment_info' do
    it 'returns the last comment info' do
      topic = create(:topic, forum: forum)
      comment = create(:comment, topic: topic, created_at: 1.day.ago)

      expect(forum.last_comment_info).to eq("#{comment.user.username} 1 day ago")
    end

    it 'returns nil if there are no comments' do
      expect(forum.last_comment_info).to be_nil
    end
  end

  describe '#last_comment_time' do
    it 'returns the last comment time' do
      topic = create(:topic, forum: forum)

      comment = create(:comment, topic: topic, created_at: 1.day.ago)

      expect(forum.last_comment_time).to eq(comment.created_at)
    end
  end

  describe 'Crud methods' do
    it 'can be created' do
      new_forum = build(:forum, name: 'My New Forum', category: category, user: user)
      new_forum.save

      expect(new_forum).to be_persisted
    end

    it 'can be read' do
      created_forum = create(:forum, category: category, user: user)

      expect(Forum.find(created_forum.id)).to eq(created_forum)
    end

    it 'can be updated' do
      forum_to_update = create(:forum, category: category, user: user)
      forum_to_update.update(name: 'A Different Name')

      expect(forum_to_update.reload.name).to eq('A Different Name')
    end

    it 'can be deleted' do
      forum_to_delete = create(:forum, category: category, user: user)
      forum_id = forum_to_delete.id
      forum_to_delete.destroy

      expect(Forum.where(id: forum_id)).to be_empty
    end
  end
end
