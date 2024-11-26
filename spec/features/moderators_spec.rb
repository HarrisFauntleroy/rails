# frozen_string_literal: true

require 'rails_helper'

feature 'Moderators', js: true do
  let(:moderator) { create(:user, :moderator) }

  before do
    sign_in moderator
  end

  it 'moderator logs in' do
    visit root_path
    expect(page).to have_text("Welcome #{moderator.username}!")
    expect(page).to have_text('Moderator')
  end
end
