# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserPolicy do
  subject { described_class.new(user, record) }

  shared_examples 'a restricted user' do
    # it { is_expected.not_to permit(:show?) }
    # it { is_expected.not_to permit(:index?) }
    # it { is_expected.not_to permit(:create?) }
    # it { is_expected.not_to permit(:edit?) }
    # it { is_expected.not_to permit(:update?) }
    # it { is_expected.not_to permit(:destroy?) }
  end

  context 'for a guest' do
    let(:user) { nil }
    let(:record) { create(:user, id: 2) }

    include_examples 'a restricted user'
  end

  context 'for a user' do
    let(:user) { create(:user, id: 1) }
    let(:record) { create(:user, id: 2) }

    # it { is_expected.to permit(:show?) }
    it { is_expected.not_to permit_action(:index) }
    it { is_expected.not_to permit_action(:create) }
    it { is_expected.not_to permit_action(:edit) }
    it { is_expected.not_to permit_action(:update) }
    it { is_expected.not_to permit_action(:destroy) }

    context 'when the record is their own' do
      let(:record) { user }

      # it { is_expected.to permit(:show?) }
      it { is_expected.not_to permit_action(:index) }
      it { is_expected.not_to permit_action(:create) }
      it { is_expected.to permit_action(:edit) }
      it { is_expected.to permit_action(:update) }
      it { is_expected.to permit_action(:destroy) }
    end
  end

  context 'for a moderator' do
    let(:user) { create(:user, id: 1, moderator: true) }
    let(:record) { create(:user, id: 2) }

    # it { is_expected.to permit(:show?) }
    it { is_expected.not_to permit_action(:index) }
    it { is_expected.not_to permit_action(:create) }
    it { is_expected.not_to permit_action(:edit) }
    it { is_expected.not_to permit_action(:update) }
    it { is_expected.not_to permit_action(:destroy) }

    context 'when the record is their own' do
      let(:record) { user }

      # it { is_expected.to permit(:show?) }
      it { is_expected.not_to permit_action(:index) }
      it { is_expected.not_to permit_action(:create) }
      it { is_expected.to permit_action(:edit) }
      it { is_expected.to permit_action(:update) }
      it { is_expected.to permit_action(:destroy) }
    end
  end

  context 'for an admin' do
    let(:user) { create(:user, id: 1, admin: true) }
    let(:record) { create(:user, id: 2) }

    # it { is_expected.to permit(:show?) }
    it { is_expected.to permit_action(:index) }
    it { is_expected.not_to permit_action(:create) }
    it { is_expected.to permit_action(:edit) }
    it { is_expected.to permit_action(:update) }
    it { is_expected.to permit_action(:destroy) }

    context 'when the record is their own' do
      let(:record) { user }

      # it { is_expected.to permit(:show?) }
      it { is_expected.to permit_action(:index) }
      it { is_expected.not_to permit_action(:create) }
      it { is_expected.to permit_action(:edit) }
      it { is_expected.to permit_action(:update) }
      it { is_expected.not_to permit_action(:destroy) }
    end
  end
end
