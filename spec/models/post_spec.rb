# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Post, type: :model do
  before(:each) do
    @user = create(:user, id: 1)
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
  end 
end 
