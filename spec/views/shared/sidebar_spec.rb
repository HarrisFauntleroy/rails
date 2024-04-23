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
    it 'should render "Welcome" label' do
      render
      expect(rendered).to have_content(t('welcome'))
    end

    describe 'for a user' do
      it 'shows user-specific elements' do
        render partial: 'shared/sidebar', locals: { resource: @user }
        expect(rendered).to have_content(t('user'))
        expect(rendered).not_to have_content(t('moderator'))
        expect(rendered).not_to have_content(t('admin'))
        expect(rendered).to have_content(t('registered_member', number: @user.id))
        expect(rendered).to have_content(t('devise.sign_out'))
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
        expect(rendered).not_to have_content(t('user'))
        expect(rendered).to have_content(t('moderator'))
        expect(rendered).not_to have_content(t('admin'))
        expect(rendered).to have_content(t('registered_member', number: @moderator.id))
        expect(rendered).to have_content(t('devise.sign_out'))
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
        expect(rendered).not_to have_content(t('user'))
        expect(rendered).not_to have_content(t('moderator'))
        expect(rendered).to have_content(t('admin'))
        expect(rendered).to have_content(t('registered_member', number: @admin.id))
        expect(rendered).to have_content(t('devise.sign_out'))
      end
    end
  end

  it 'should contain "Online" section' do
    render
    expect(rendered).to have_content(t('online'))
    # todo 'add online users'
    # todo 'add members count'
    # todo 'add newest member'
    # todo 'most ever online'
  end

  it 'should contain "Members Birthdays" section' do
    render
    expect(rendered).to have_content(t('members_birthdays'))
    # todo 'add members birthdays'
  end

  it 'should contain "Contact" section' do
    render
    expect(rendered).to have_content(t('contact'))
    expect(rendered).to have_content(t('contact_sidebar_text'))
    # todo 'add contact link'
  end

  it 'should contain "Support 4hv.org!" section' do
    render
    expect(rendered).to have_content(t('support_4hv'))
    expect(rendered).to have_content(t('donate'))
    # todo 'add donate link'
  end
end
