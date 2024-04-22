# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'shared/_sidebar', type: :view do
  before(:each) do
    @user = create(:user)
    sign_in @user
    allow(view).to receive(:current_user).and_return(@user)
  end

  it 'should contain "Main Menu" section' do
    render
    expect(rendered).to have_content(t('main_menu'))
  end

  describe 'should contain "Welcome" section' do
    it 'should contain "Welcome" section' do
      render
      expect(rendered).to have_content(t('welcome'))
    end

    describe 'for a user' do
      it 'shows user-specific elements' do
        render partial: 'shared/sidebar', locals: { resource: @user }
        expect(rendered).to have_content(t('registered_member'))
      end
    end

    describe 'for a moderator' do
      before(:each) do
        @moderator = create(:user, moderator: true)
        sign_in @moderator
        allow(view).to receive(:current_user).and_return(@moderator)
      end

      it 'shows moderator-specific elements' do
        render partial: 'shared/sidebar', locals: { resource: @moderator }
        expect(rendered).to have_content(t('registered_member'))
        expect(rendered).to have_content(t('moderator'))
      end
    end
  end

  describe 'for an admin' do
    before(:each) do
      @admin = create(:user, admin: true)
      sign_in @admin
      allow(view).to receive(:current_user).and_return(@admin)
    end

    it 'shows admin-specific elements' do
      render partial: 'shared/sidebar', locals: { resource: @admin }

      expect(rendered).to have_content(t('registered_member'))
      expect(rendered).to have_content(t('admin'))
    end
  end

  it 'should contain "Online" section' do
    render
    expect(rendered).to have_content(t('online'))
  end

  it 'should contain "Members Birthdays" section' do
    render
    expect(rendered).to have_content(t('members_birthdays'))
  end

  it 'should contain "Contact" section' do
    render
    expect(rendered).to have_content(t('contact'))
  end

  it 'should contain "Support 4hv.org!" section' do
    render
    expect(rendered).to have_content(t('support_4hv'))
  end
end
