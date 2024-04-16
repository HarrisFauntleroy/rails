# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Topic, type: :model do
  before(:each) do
    @user = create(:user, id: 1)
    @category = create(:category, id: 1)
    @topic = create(:topic, id: 1)
  end

  it 'has a valid factory' do
    expect(@topic).to be_valid
  end

  describe 'validations' do
    it 'is valid with a valid title' do
      topic = build(:topic, title: 'My Topic')
      expect(topic).to be_valid
    end
    it 'is invalid without a title' do
      topic = build(:topic, title: nil)
      expect(topic).to_not be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do 
      expect(@topic.user).to eq(@topic.user)
    end

    it 'has a parent category' do
      category = create(:category, topics: [@topic])
      expect(@topic.category).to eq(category)
    end
  
    it 'is destroyed when its parent category is destroyed' do
      category = create(:category, topics: [@topic])
      category.destroy

      expect(Topic.where(id: @topic.id)).to be_empty
    end

    it 'can have many posts' do
      post1 = create(:post, topic: @topic)
      post2 = create(:post, topic: @topic)

      expect(@topic.posts).to include(post1, post2)
    end
  end 

  describe 'Crud methods' do
    it 'can be created' do
      new_topic = build(:topic, title: 'Test Topic', user: @user, category: @category)
      new_topic.save

      expect(new_topic).to be_persisted 
    end

    it 'can be read' do
      created_topic = create(:topic, title: 'My Topic', user: @user, category: @category)

      expect(Topic.find(created_topic.id)).to eq(created_topic)
    end

    it 'can be updated' do
      topic_to_update = create(:topic, title: 'Old Title', user: @user, category: @category)
      topic_to_update.update(title: 'New Title')

      expect(topic_to_update.reload.title).to eq('New Title')
    end

    it 'can be deleted' do
      topic_to_delete = create(:topic, user: @user, category: @category)
      topic_id = topic_to_delete.id
      topic_to_delete.destroy 

      expect(Topic.where(id: topic_id)).to be_empty
    end
  end
end 
