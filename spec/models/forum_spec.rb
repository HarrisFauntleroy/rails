# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Forum, type: :model do
  before(:each) do
    @user = create(:user, id: 1)
    @forum = create(:forum, id: 1)
  end

  it 'has a valid factory' do
    expect(@forum).to be_valid
  end

  describe 'validations' do
    it 'is valid with a valid name' do
      forum = build(:forum, name: 'My Forum')
      expect(forum).to be_valid
    end
    it 'is invalid without a name' do
      forum = build(:forum, name: nil)
      expect(forum).to_not be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      expect(@forum.user).to eq(@forum.user)
    end

    it 'has a parent category_group' do
      category_group = create(:category_group, forums: [@forum])
      expect(@forum.category_group).to eq(category_group)
    end

    it 'is destroyed when its parent category_group is destroyed' do
      category_group = create(:category_group, forums: [@forum])
      category_group.destroy

      expect(Forum.where(id: @forum.id)).to be_empty
    end

    it 'can have many topics' do
      topic1 = create(:topic, forum: @forum)
      topic2 = create(:topic, forum: @forum)

      expect(@forum.topics).to include(topic1, topic2)
    end
  end

  describe 'Crud methods' do
    it 'can be created' do
      new_forum = build(:forum, name: 'My New Forum')
      new_forum.save

      expect(new_forum).to be_persisted
    end

    it 'can be read' do
      created_forum = create(:forum)

      expect(Forum.find(created_forum.id)).to eq(created_forum)
    end

    it 'can be updated' do
      forum_to_update = create(:forum)
      forum_to_update.update(name: 'A Different Name')

      expect(forum_to_update.reload.name).to eq('A Different Name')
    end

    it 'can be deleted' do
      forum_to_delete = create(:forum)
      forum_id = forum_to_delete.id
      forum_to_delete.destroy

      expect(Forum.where(id: forum_id)).to be_empty
    end
  end
end
