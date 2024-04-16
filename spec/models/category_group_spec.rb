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
end 
