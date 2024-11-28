# frozen_string_literal: true

# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  content           :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  parent_comment_id :integer
#  topic_id          :integer          not null
#  user_id           :integer
#
# Indexes
#
#  index_comments_on_topic_id  (topic_id)
#  index_comments_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (topic_id => topics.id)
#
require 'rails_helper'

describe Comment, type: :model do
  let(:user) { create(:user, id: 1) }
  let(:topic) { create(:topic, id: 1, user:) }
  let(:comment) { create(:comment, id: 1, topic:, user:) }

  it 'has a valid factory' do
    expect(comment).to be_valid
  end

  describe 'validations' do
    it 'is valid with content' do
      comment = build(:comment, content: 'My Comment')
      expect(comment).to be_valid
    end

    it 'is invalid without content' do
      comment = build(:comment, content: nil)
      expect(comment).not_to be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      expect(comment.user).to eq(comment.user)
    end

    it 'is destroyed when its parent user is destroyed' do
      user = create(:user, comments: [comment])
      user.destroy

      expect(described_class.where(id: comment.id)).to be_empty
    end

    it 'has a parent topic' do
      topic = create(:topic, comments: [comment])
      expect(comment.topic).to eq(topic)
    end

    it 'is destroyed when its parent topic is destroyed' do
      topic = create(:topic, comments: [comment])
      topic.destroy

      expect(described_class.where(id: comment.id)).to be_empty
    end

    it 'can have many replies' do
      reply1 = create(:comment, parent_comment: comment)
      reply2 = create(:comment, parent_comment: comment)

      expect(comment.replies).to include(reply1, reply2)
    end

    it 'is not destroyed when its parent comment is destroyed' do
      reply = create(:comment, parent_comment: comment)
      comment.destroy

      expect(described_class.where(id: reply.id)).not_to be_empty
    end
  end

  describe 'Crud methods' do
    it 'can be created' do
      new_comment = build(:comment, content: 'Some content', user:, topic:)
      new_comment.save

      expect(new_comment).to be_persisted
    end

    it 'can be read' do
      created_comment = create(:comment, user:, topic:)

      expect(described_class.find(created_comment.id)).to eq(created_comment)
    end

    it 'can be updated' do
      comment_to_update = create(:comment, content: 'Old Content', user:, topic:)
      comment_to_update.update(content: 'New Content')

      expect(comment_to_update.reload.content).to eq('New Content')
    end

    it 'can be deleted' do
      comment_to_delete = create(:comment, user:, topic:)
      comment_id = comment_to_delete.id
      comment_to_delete.destroy

      expect(described_class.where(id: comment_id)).to be_empty
    end
  end
end
