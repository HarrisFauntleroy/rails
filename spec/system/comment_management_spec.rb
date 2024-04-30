require 'rails_helper'

RSpec.describe 'CommentManagement', type: :system, js: true do
  let(:user) { create(:user, id: 1) }
  let(:forum) { create(:forum, user:) }
  let(:topic) { create(:topic, forum:, user:) }
  let(:comment) { create(:comment, topic:, user:) }

  before do
    # driven_by(:selenium_chrome) # for JS testing
    driven_by(:selenium_chrome_headless) # for headless js testing
  end

  it 'initializes EasyMDE on the new topic form' do
    sign_in user
    visit new_forum_topic_path(forum, topic)

    expect(page).to have_selector('#markdown-editor', visible: false)
    expect(page).to have_css('.EasyMDEContainer', visible: true)
  end

  it 'initializes EasyMDE on the comment form' do
    sign_in user
    visit forum_topic_path(forum, topic)

    expect(page).to have_selector('#markdown-editor', visible: false)
    expect(page).to have_css('.EasyMDEContainer', visible: true)
  end
end
