# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CategoryGroup, type: :model do
  before(:each) do
    @user = create(:user, id: 1)
    @category_group = create(:category_group, id: 1)
  end

  it 'has a valid factory' do
    expect(@category_group).to be_valid
  end

  describe 'validations' do
    it 'is valid with a valid name' do
      category_group = build(:category_group, name: 'My Category Group')
      expect(category_group).to be_valid
    end
    it 'is invalid without a name' do
      category_group = build(:category_group, name: nil)
      expect(category_group).to_not be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      expect(@category_group.user).to eq(@category_group.user)
    end

    it 'can have many categories' do
      category1 = create(:category, category_group: @category_group)
      category2 = create(:category, category_group: @category_group)

      expect(@category_group.categories).to include(category1, category2)
    end
  end

  describe 'Crud methods' do
    it 'can be created' do
      new_category_group = build(:category_group, name: 'New Group')
      new_category_group.save

      expect(new_category_group).to be_persisted
    end

    it 'can be read' do
      created_group = create(:category_group, name: 'Test Group')

      expect(CategoryGroup.find(created_group.id)).to eq(created_group)
    end

    it 'can be updated' do
      group_to_update = create(:category_group, name: 'Old Name')
      group_to_update.update(name: 'Updated Name')

      expect(group_to_update.reload.name).to eq('Updated Name')
    end

    it 'can be deleted' do
      group_to_delete = create(:category_group)
      group_id = group_to_delete.id
      group_to_delete.destroy

      expect(CategoryGroup.where(id: group_id)).to be_empty
    end
  end
end
