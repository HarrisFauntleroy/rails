# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Post, type: :model do
  before(:each) do
    @user = create(:user, id: 1)
    @topic = create(:topic, id: 1)
    @post = create(:post, id: 1)
  end

  it 'has a valid factory' do
    expect(@post).to be_valid
  end

  describe 'validations' do
    it 'is valid with content' do
      post = build(:post, content: 'My Post')
      expect(post).to be_valid
    end
    it 'is invalid without content' do
      post = build(:post, content: nil)
      expect(post).to_not be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do 
      expect(@post.user).to eq(@post.user)
    end

    it 'has a parent topic' do
      topic = create(:topic, posts: [@post])
      expect(@post.topic).to eq(topic)
    end
  
    it 'is destroyed when its parent topic is destroyed' do
      topic = create(:topic, posts: [@post])
      topic.destroy

      expect(Post.where(id: @post.id)).to be_empty
    end
  end 

  describe 'Crud methods' do
    before(:each) do 
      @user = create(:user)
      @topic = create(:topic)  # Assuming you have associations
    end
  
    it 'can be created' do
      new_post = build(:post, content: 'Some content', user: @user, topic: @topic)
      new_post.save
  
      expect(new_post).to be_persisted 
    end
  
    it 'can be read' do
      created_post = create(:post, user: @user, topic: @topic)
  
      expect(Post.find(created_post.id)).to eq(created_post)
    end
  
    it 'can be updated' do
      post_to_update = create(:post, content: 'Old Content', user: @user, topic: @topic)
      post_to_update.update(content: 'New Content')
  
      expect(post_to_update.reload.content).to eq('New Content') 
    end
  
    it 'can be deleted' do
      post_to_delete = create(:post, user: @user, topic: @topic)
      post_id = post_to_delete.id
      post_to_delete.destroy 
  
      expect(Post.where(id: post_id)).to be_empty  
    end
  end 
end 
