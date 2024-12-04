# frozen_string_literal: true

require 'rails_helper'

RSpec.shared_examples 'a user role display' do |role|
  it "shows #{role} role indicator" do
    render partial: 'shared/sidebar', locals: { resource: user }
    expect(rendered).to have_content(t(role))
  end

  it 'shows member registration number' do
    render partial: 'shared/sidebar', locals: { resource: user }
    expect(rendered).to have_content(t('registered_member', number: user.id))
  end

  it 'shows sign out link' do
    render partial: 'shared/sidebar', locals: { resource: user }
    expect(rendered).to have_content(t('devise.sign_out'))
  end

  it 'hides other role indicators' do
    render partial: 'shared/sidebar', locals: { resource: user }
    (%i[user moderator admin] - [role]).each do |other_role|
      expect(rendered).not_to have_content(t(other_role))
    end
  end
end

describe 'shared/_sidebar', type: :view do
  let(:user) { create(:user) }

  before do
    sign_in user
    allow(view).to receive(:current_user).and_return(user)
  end

  it 'contains "Main Menu" section' do
    render
    expect(rendered).to have_content(t('main_menu'))
  end

  describe '"Welcome" section' do
    it 'renders welcome label' do
      render
      expect(rendered).to have_content(t('welcome'))
    end

    describe 'for a regular user' do
      include_examples 'a user role display', :user
    end

    describe 'for a moderator' do
      let(:user) { create(:user, moderator: true) }

      before do
        sign_in user
        allow(view).to receive(:current_user).and_return(user)
      end

      include_examples 'a user role display', :moderator
    end

    describe 'for an admin' do
      let(:user) { create(:user, admin: true) }

      before do
        sign_in user
        allow(view).to receive(:current_user).and_return(user)
      end

      include_examples 'a user role display', :admin
    end
  end

  it 'contains "Online" section' do
    render
    expect(rendered).to have_content(t('online'))
  end

  it 'contains "Members Birthdays" section' do
    render
    expect(rendered).to have_content(t('members_birthdays'))
  end

  describe '"Contact" section' do
    before { render }

    it 'shows section heading' do
      expect(rendered).to have_content(t('contact'))
    end

    it 'shows contact text' do
      expect(rendered).to have_content(t('contact_sidebar_text'))
    end
  end

  describe '"Support" section' do
    before { render }

    it 'shows section heading' do
      expect(rendered).to have_content(t('support_4hv'))
    end

    it 'shows donate text' do
      expect(rendered).to have_content(t('donate'))
    end
  end
end
