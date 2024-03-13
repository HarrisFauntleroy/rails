require 'rails_helper'

RSpec.describe User, type: :model do
  
  describe 'user' do
    user = User.create()
    
    it "creates a new user with valid attributes" do
      expect(user.save).to be_truthy
    end
  end
end
