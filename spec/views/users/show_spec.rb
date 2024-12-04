# frozen_string_literal: true

require 'rails_helper'

describe 'users/show', type: :view do
  let(:user) { create(:user, id: 1) }
  let(:recent_topics_opened) { create_list(:topic, 1, user:) }
  let(:recent_comments) { create_list(:comment, 2, user:) }

  before do
    assign(:user, user)
    assign(:recent_topics_opened, recent_topics_opened)
    assign(:recent_comments, recent_comments)
  end

  it 'card title should say "Users"' do
    render
    expect(rendered).to have_content(t('users'))
  end

  it 'displays the user\'s username' do
    render
    expect(rendered).to match(user.username)
  end

  context 'when displaying the user\'s recent topics opened' do
    before { render }

    it 'with header' do
      expect(rendered).to have_content(t('threads_opened'))
    end

    it 'with count' do
      expect(rendered).to have_content('(1)')
    end

    it 'with topic titles' do
      recent_topics_opened.each do |topic|
        expect(rendered).to have_content(topic.title)
      end
    end

    it 'with topic created_at' do
      recent_topics_opened.each do |topic|
        expect(rendered).to have_content(topic.created_at.strftime('%d %b %Y at %I:%M %p')) # 18 Jan 2021 at 12:00 PM
      end
    end
  end

  context 'when displaying the user\'s recent comments' do
    before { render }

    it 'with header' do
      expect(rendered).to have_content(t('recent_comments'))
    end

    it 'with count' do
      expect(rendered).to have_content('(2)')
    end

    it 'with comment contents' do
      recent_comments.each do |comment|
        expect(rendered).to have_content(comment.content.truncate(50))
      end
    end

    it 'with comment created_at' do
      recent_comments.each do |comment|
        expect(rendered).to have_content(comment.created_at.strftime('%d %b %Y at %I:%M %p')) # 18 Jan 2021 at 12:00 PM
      end
    end
  end
end
