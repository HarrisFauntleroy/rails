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

    it 'has a parent category_group' do
      category_group = create(:category_group, categories: [@category])
      expect(@category.category_group).to eq(category_group)
    end

    it 'is destroyed when its parent category_group is destroyed' do
      category_group = create(:category_group, categories: [@category])
      category_group.destroy
      
      expect(Category.where(id: @category.id)).to be_empty
    end

    it 'can have many topics' do
      topic1 = create(:topic, category: @category)
      topic2 = create(:topic, category: @category)

      expect(@category.topics).to include(topic1, topic2)
    end
  end 

  describe 'Crud methods' do
    it 'can be created' do
      new_category = build(:category, name: 'My New Category')
      new_category.save
  
      expect(new_category).to be_persisted 
    end
  
    it 'can be read' do
      created_category = create(:category)
  
      expect(Category.find(created_category.id)).to eq(created_category)
    end
  
    it 'can be updated' do
      category_to_update = create(:category)  
      category_to_update.update(name: 'A Different Name')
  
      expect(category_to_update.reload.name).to eq('A Different Name')
    end
  
    it 'can be deleted' do
      category_to_delete = create(:category)
      category_id = category_to_delete.id
      category_to_delete.destroy 
  
      expect(Category.where(id: category_id)).to be_empty
    end
  end
end 
