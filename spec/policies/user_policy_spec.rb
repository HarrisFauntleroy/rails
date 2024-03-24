require 'rails_helper'

RSpec.describe UserPolicy, type: :policy do
  let(:regular_user) { build(:user) }  # Or use create(:user) if needed
  let(:admin_user) { build(:user, admin: true) }

  subject { described_class.new(user, User) } # User to be authorized

  context "for a regular user" do
    let(:user) { regular_user }

    it { should_not permit_action(:update) }  
    it { should_not permit_action(:destroy) }
  end

  context "for an admin user" do
    let(:user) { admin_user }

    it { should permit_action(:update) } 
    it { should permit_action(:destroy) }
  end

  permissions ".scope" do
    pending "add some examples to (or delete) #{__FILE__}"
  end

  permissions :show? do
    pending "add some examples to (or delete) #{__FILE__}"
  end

  permissions :create? do
    pending "add some examples to (or delete) #{__FILE__}"
  end

  permissions :update? do
    pending "add some examples to (or delete) #{__FILE__}"
  end

  permissions :destroy? do
    pending "add some examples to (or delete) #{__FILE__}"
  end
end
