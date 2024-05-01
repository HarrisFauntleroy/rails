require 'rails_helper'

# This spec tests the MathJax integration in the application.
# MathJax is a CDN-hosted LaTeX rendering engine.

RSpec.describe 'MathJaxIntegration', type: :system, js: true do
  let(:user) { create(:user, id: 1) }
  let(:forum) { create(:forum, user:) }
  let(:topic) { create(:topic, forum:, user:, content: "$$\\lambda = \\frac{\\ln{2}}{T_{\\text{half}}}$$") }
  let(:comment) { create(:comment, topic:, user:, content: "$$\\lambda = \\frac{\\ln{2}}{T_{\\text{half}}}$$") }

  before do
    driven_by(:selenium_chrome_headless)
    # driven_by(:selenium_chrome)
    sign_in user
  end

  it 'renders LaTeX content in a topic using MathJax' do
    visit forum_topic_path(forum, topic)

    expect(page).to have_css('mjx-container', visible: :all)
    expect(page).to have_text('λ')
  end

  it 'renders LaTeX content in a comment using MathJax' do
    visit forum_topic_path(forum, topic)

    expect(page).to have_css('mjx-container', visible: :all)
    expect(page).to have_text('λ')
  end
end
