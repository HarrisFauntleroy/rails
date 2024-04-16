# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Category, type: :model do
  before(:each) do
    @user = create(:user, id: 1)
    @category = create(:category, id: 1)
  end

  it 'has a valid factory' do
    expect(@category).to be_valid
  end

  describe 'validations' do
    it 'is valid with a valid name' do
      category = build(:category, name: 'My Category')
      expect(category).to be_valid
    end
    it 'is invalid without a name' do
      category = build(:category, name: nil)
      expect(category).to_not be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do 
      expect(@category.user).to eq(@category.user)
    end

    it 'can have many topics' do
      topic1 = create(:topic, category: @category)
      topic2 = create(:topic, category: @category)

      expect(@category.topics).to include(topic1, topic2)
    end
  end 
end 
