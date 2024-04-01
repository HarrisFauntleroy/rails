# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'has a valid factory' do
    expect(build(:user)).to be_valid
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
  it 'can have many posts' do
    user = create(:user)
    post1 = create(:post, user: user)
    post2 = create(:post, user: user)

    expect(user.posts).to include(post1, post2)
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
  end
end
