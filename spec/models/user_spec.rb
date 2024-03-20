require 'rails_helper'

RSpec.describe User, type: :model do
  it "has a valid factory" do
    expect(build(:user)).to be_valid
  end
  it "is invalid without an email" do
    user = build(:user, email: nil)
    expect(user).to_not be_valid
  end
  it "is invalid with a duplicate email" do
    create(:user, email: "test@example.com")
    user = build(:user, email: "test@example.com")
    expect(user).to_not be_valid
  end 
  it "can have many posts" do
    user = create(:user)
    post1 = create(:post, user: user) # Assuming you have a Post factory
    post2 = create(:post, user: user)

    expect(user.posts).to include(post1, post2)
  end
end
