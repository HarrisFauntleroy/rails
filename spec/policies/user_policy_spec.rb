require 'rails_helper'

RSpec.describe UserPolicy do
  subject { described_class.new(user, record) }

  context "for a visitor (no user)" do
    let(:user) { nil }
    let(:record) { User.new } 

    it { is_expected.not_to permit_action(:show) }
    it { is_expected.not_to permit_action(:update) }
    it { is_expected.not_to permit_action(:destroy) }
  end

  context "for a regular user" do
    let(:user) { User.new }
    let(:record) { User.new }

    it { is_expected.to permit_action(:show) }

    it { is_expected.not_to permit_action(:update) } 
    it { is_expected.not_to permit_action(:destroy) } 

    context "when the record is themselves" do
      let(:record) { user }

      it { is_expected.to permit_action(:update) }
      it { is_expected.to permit_action(:destroy) }
    end
  end

  context "for an admin user" do
    let(:user) { User.new(admin: true) }
    let(:record) { User.new }

    it { is_expected.to permit_action(:show) }
    it { is_expected.to permit_action(:update) }
    it { is_expected.to permit_action(:destroy) }
  end
end
