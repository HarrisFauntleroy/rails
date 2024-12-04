# frozen_string_literal: true

require 'rails_helper'

describe 'Moderators', type: :system do
  let(:moderator) { create(:user, :moderator) }

  before do
    sign_in moderator
  end

  it 'displays welcome message after successful login' do
    visit root_path

    expect(page).to have_text("Welcome #{moderator.username}!")
  end

  it 'displays moderator role in navigation' do
    visit root_path

    expect(page).to have_text('Moderator')
  end
end
