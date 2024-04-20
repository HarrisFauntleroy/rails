# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'users/show', type: :view do
  describe 'for a normal user' do
    before(:each) do
      @user = create(:user, id: 1)
      @recent_topics_opened = create_list(:topic, 1, user: @user)
      @recent_posts = create_list(:post, 1, user: @user)
    end
    it 'card title should say "Users"' do
      render
      expect(rendered).to have_content(t("users"))
    end
    it 'displays the user\'s username' do
      render
      expect(rendered).to match(@user.username)
    end
    it 'displays the user\'s recent topics opened' do
      render
      expect(rendered).to have_content(t('threads_opened'))
      @recent_topics_opened.each do |topic|
        expect(rendered).to have_content(topic.title)
        expect(rendered).to have_content(topic.created_at.strftime('%d %b %Y at %I:%M %p'))
      end
    end
    it 'displays the user\'s recent posts' do
      render
      expect(rendered).to have_content(t('recent_comments'))
      @recent_posts.each do |post|
        expect(rendered).to have_content(post.content.truncate(50))
        expect(rendered).to have_content(post.created_at.strftime('%d %b %Y at %I:%M %p'))
      end
    end
  end
  describe 'for an admin' do
  end
end
