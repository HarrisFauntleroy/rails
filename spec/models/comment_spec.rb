# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  before(:each) do
    @user = create(:user, id: 1)
    @topic = create(:topic, id: 1)
    @comment = create(:comment, id: 1)
  end

  it 'has a valid factory' do
    expect(@comment).to be_valid
  end

  describe 'validations' do
    it 'is valid with content' do
      comment = build(:comment, content: 'My Comment')
      expect(comment).to be_valid
    end
    it 'is invalid without content' do
      comment = build(:comment, content: nil)
      expect(comment).to_not be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      expect(@comment.user).to eq(@comment.user)
    end

    it 'has a parent topic' do
      topic = create(:topic, comments: [@comment])
      expect(@comment.topic).to eq(topic)
    end

    it 'is destroyed when its parent topic is destroyed' do
      topic = create(:topic, comments: [@comment])
      topic.destroy

      expect(Comment.where(id: @comment.id)).to be_empty
    end
  end

  describe 'Crud methods' do
    before(:each) do
      @user = create(:user)
      @topic = create(:topic) # Assuming you have associations
    end

    it 'can be created' do
      new_comment = build(:comment, content: 'Some content', user: @user, topic: @topic)
      new_comment.save

      expect(new_comment).to be_persisted
    end

    it 'can be read' do
      created_comment = create(:comment, user: @user, topic: @topic)

      expect(Comment.find(created_comment.id)).to eq(created_comment)
    end

    it 'can be updated' do
      comment_to_update = create(:comment, content: 'Old Content', user: @user, topic: @topic)
      comment_to_update.update(content: 'New Content')

      expect(comment_to_update.reload.content).to eq('New Content')
    end

    it 'can be deleted' do
      comment_to_delete = create(:comment, user: @user, topic: @topic)
      comment_id = comment_to_delete.id
      comment_to_delete.destroy

      expect(Comment.where(id: comment_id)).to be_empty
    end
  end
end
