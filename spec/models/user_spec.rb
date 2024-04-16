# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  before(:each) do
    @user = create(:user, id: 1)
  end

  it 'has a valid factory' do
    expect(@user).to be_valid
  end

  describe 'validations' do
    it 'is valid with a valid email' do
      user = build(:user, email: 'test@test.com')
      expect(user).to be_valid
    end
    it 'is invalid without an email' do
      user = build(:user, email: nil)
      expect(user).to_not be_valid
    end
    it 'is invalid with a duplicate email' do
      create(:user, email: 'test@example.com')
      user = build(:user, email: 'test@example.com')
      expect(user).to_not be_valid
    end

    it 'is valid with a valid username' do
      user = build(:user, username: 'testington')
      expect(user).to be_valid
    end
    it 'is invalid without an username' do
      user = build(:user, username: nil)
      expect(user).to_not be_valid
    end
    it 'is invalid with a duplicate username' do
      create(:user, username: 'testington')
      user = build(:user, username: 'testington')
      expect(user).to_not be_valid
    end

    it 'is valid with a valid password' do
      user = build(:user, password: 'Password1')
      expect(user).to be_valid
    end
    it 'is invalid without a password' do
      user = build(:user, password: nil)
      expect(user).to_not be_valid
    end
    it 'is invalid with a password less than 8 characters' do
      user = build(:user, password: '1234567')
      expect(user).to_not be_valid
    end
  end

  describe 'associations' do
    it 'can have many category_groups' do
      category_group1 = create(:category_group, user: @user)
      category_group2 = create(:category_group, user: @user)

      expect(@user.category_groups).to include(category_group1, category_group2)
    end

    it 'can have many categories' do
      category1 = create(:category, user: @user)
      category2 = create(:category, user: @user)

      expect(@user.categories).to include(category1, category2)
    end

    it 'can have many topics' do
      topic1 = create(:topic, user: @user)
      topic2 = create(:topic, user: @user)

      expect(@user.topics).to include(topic1, topic2)
    end

    it 'can have many posts' do
      post1 = create(:post, user: @user)
      post2 = create(:post, user: @user)

      expect(@user.posts).to include(post1, post2)
    end
  end

  describe 'User roles' do
    it 'defaults to a regular user' do
      user = build(:user)
      expect(user.admin).to be false
    end

    it 'can be an admin' do
      admin_user = build(:user, admin: true)
      expect(admin_user.admin).to be true
    end

    it 'can be an moderator' do
      moderator_user = build(:user, moderator: true)
      expect(moderator_user.moderator).to be true
    end
  end

  describe 'Crud methods' do
    it 'can be created' do
      user = create(:user)
      expect(user).to be_valid
    end

    it 'can be read' do
      user = create(:user)
      expect(User.find(user.id)).to eq(user)
    end

    it 'can be updated' do
      user = create(:user)
      user.update(username: 'new_username')
      expect(user.username).to eq('new_username')
    end

    it 'can be deleted' do
      user = create(:user)
      user.destroy
      expect(User.all).to_not include(user)
    end
  end
end
