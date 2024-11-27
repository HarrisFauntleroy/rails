# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'shared/_sidebar', type: :view do
  let(:user) { create(:user) }

  before do
    sign_in user
    allow(view).to receive(:current_user).and_return(user)
  end

  it 'contains "Main Menu" section' do
    render
    expect(rendered).to have_content(t('main_menu'))
  end

  describe 'should contain "Welcome" section' do
    it 'renders "Welcome" label' do
      render
      expect(rendered).to have_content(t('welcome'))
    end

    describe 'for a user' do
      it 'shows user-specific elements' do
        render partial: 'shared/sidebar', locals: { resource: user }
        expect(rendered).to have_content(t('user'))
        expect(rendered).not_to have_content(t('moderator'))
        expect(rendered).not_to have_content(t('admin'))
        expect(rendered).to have_content(t('registered_member', number: user.id))
        expect(rendered).to have_content(t('devise.sign_out'))
      end
    end

    describe 'for a moderator' do
      let(:moderator) { create(:user, moderator: true) }

      before do
        sign_in moderator
        allow(view).to receive(:current_user).and_return(moderator)
      end

      it 'shows moderator-specific elements' do
        render partial: 'shared/sidebar', locals: { resource: moderator }
        expect(rendered).not_to have_content(t('user'))
        expect(rendered).to have_content(t('moderator'))
        expect(rendered).not_to have_content(t('admin'))
        expect(rendered).to have_content(t('registered_member', number: moderator.id))
        expect(rendered).to have_content(t('devise.sign_out'))
      end
    end

    describe 'for an admin' do
      let(:admin) { create(:user, admin: true) }

      before do
        sign_in admin
        allow(view).to receive(:current_user).and_return(admin)
      end

      it 'shows admin-specific elements' do
        render partial: 'shared/sidebar', locals: { resource: admin }
        expect(rendered).not_to have_content(t('user'))
        expect(rendered).not_to have_content(t('moderator'))
        expect(rendered).to have_content(t('admin'))
        expect(rendered).to have_content(t('registered_member', number: admin.id))
        expect(rendered).to have_content(t('devise.sign_out'))
      end
    end
  end

  it 'contains "Online" section' do
    render
    expect(rendered).to have_content(t('online'))
    # TODO: 'add online users'
    # todo 'add members count'
    # todo 'add newest member'
    # todo 'most ever online'
  end

  it 'contains "Members Birthdays" section' do
    render
    expect(rendered).to have_content(t('members_birthdays'))
    # TODO: 'add members birthdays'
  end

  it 'contains "Contact" section' do
    render
    expect(rendered).to have_content(t('contact'))
    expect(rendered).to have_content(t('contact_sidebar_text'))
    # TODO: 'add contact link'
  end

  it 'contains "Support 4hv.org!" section' do
    render
    expect(rendered).to have_content(t('support_4hv'))
    expect(rendered).to have_content(t('donate'))
    # TODO: 'add donate link'
  end
end
