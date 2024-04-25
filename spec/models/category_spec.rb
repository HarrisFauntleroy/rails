# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Category, type: :model do
  let(:user) { create(:user, id: 1) }
  let(:category) { create(:category, user: user) }

  describe 'factory' do
    it 'is valid' do
      expect(category).to be_valid
    end
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
      expect(category.user).to eq(category.user)
    end

    it 'is destroyed when its parent user is destroyed' do
      user = create(:user, categories: [category])
      user.destroy

      expect(Category.where(id: category.id)).to be_empty
    end

    it 'can have many forums' do
      forum1 = create(:forum, category: category)
      forum2 = create(:forum, category: category)

      expect(category.forums).to include(forum1, forum2)
    end
  end

  describe 'Crud methods' do
    it 'can be created' do
      new_category = build(:category, name: 'New Group', user: user)
      new_category.save

      expect(new_category).to be_persisted
    end

    it 'can be read' do
      created_group = create(:category, name: 'Test Group', user: user)

      expect(Category.find(created_group.id)).to eq(created_group)
    end

    it 'can be updated' do
      group_to_update = create(:category, name: 'Old Name', user: user)
      group_to_update.update(name: 'Updated Name')

      expect(group_to_update.reload.name).to eq('Updated Name')
    end

    it 'can be deleted' do
      group_to_delete = create(:category, user: user)
      group_id = group_to_delete.id
      group_to_delete.destroy

      expect(Category.where(id: group_id)).to be_empty
    end
  end
end
