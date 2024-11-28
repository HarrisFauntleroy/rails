# frozen_string_literal: true

# == Schema Information
#
# Table name: topics
#
#  id             :bigint           not null, primary key
#  announcement   :boolean
#  comments_count :integer          default(0), not null
#  content        :text
#  sticky         :boolean
#  title          :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  forum_id       :integer          not null
#  user_id        :integer
#
# Indexes
#
#  index_topics_on_forum_id  (forum_id)
#  index_topics_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (forum_id => forums.id)
#
require 'rails_helper'

describe Topic, type: :model do
  let(:user) { create(:user, id: 1) }
  let(:forum) { create(:forum, user:) }
  let(:topic) { create(:topic, forum:, user:) }

  describe 'factory' do
    it 'is valid' do
      expect(topic).to be_valid
    end
  end

  describe 'validations' do
    it 'is valid with a valid title' do
      topic = build(:topic, title: 'My Topic')
      expect(topic).to be_valid
    end

    it 'is invalid without a title' do
      topic = build(:topic, title: nil)
      expect(topic).not_to be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      expect(topic.user).to eq(topic.user)
    end

    it 'belongs to a forum' do
      forum = create(:forum, topics: [topic])
      expect(topic.forum).to eq(forum)
    end

    it 'is destroyed when its parent forum is destroyed' do
      forum = create(:forum, topics: [topic])
      forum.destroy

      expect(described_class.where(id: topic.id)).to be_empty
    end

    it 'is destroyed when its parent user is destroyed' do
      user = create(:user, topics: [topic])
      user.destroy

      expect(described_class.where(id: topic.id)).to be_empty
    end

    it 'can have many comments' do
      comment1 = create(:comment, topic:)
      comment2 = create(:comment, topic:)

      expect(topic.comments).to include(comment1, comment2)
    end
  end

  describe 'sticky' do
    it 'can be marked as sticky' do
      topic.mark_as_sticky!
      expect(topic.sticky?).to be(true)
    end

    it 'can be unmarked as sticky' do
      topic.mark_as_sticky!
      topic.unmark_as_sticky!
      expect(topic.sticky?).to be(false)
    end
  end

  describe 'announcement' do
    it 'can be marked as announcement' do
      topic.mark_as_announcement!
      expect(topic.announcement?).to be(true)
    end

    it 'can be unmarked as announcement' do
      topic.mark_as_announcement!
      topic.unmark_as_announcement!
      expect(topic.announcement?).to be(false)
    end
  end

  describe 'Crud methods' do
    it 'can be created' do
      new_topic = build(:topic, title: 'New Topic', user:, forum:)
      new_topic.save

      expect(new_topic).to be_persisted
    end

    it 'can be read' do
      created_topic = create(:topic, title: 'Test Topic', user:, forum:)

      expect(described_class.find(created_topic.id)).to eq(created_topic)
    end

    it 'can be updated' do
      topic_to_update = create(:topic, title: 'Old Title', user:, forum:)
      topic_to_update.update(title: 'Updated Title')

      expect(topic_to_update.reload.title).to eq('Updated Title')
    end

    it 'can be deleted' do
      topic_to_delete = create(:topic, user:, forum:)
      topic_id = topic_to_delete.id
      topic_to_delete.destroy

      expect(described_class.where(id: topic_id)).to be_empty
    end
  end
end
