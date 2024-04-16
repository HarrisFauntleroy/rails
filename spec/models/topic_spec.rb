# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Topic, type: :model do
  before(:each) do
    @user = create(:user, id: 1)
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

    it 'can have many posts' do
      post1 = create(:post, topic: @topic)
      post2 = create(:post, topic: @topic)

      expect(@topic.posts).to include(post1, post2)
    end
  end 
end 
