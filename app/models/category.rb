# frozen_string_literal: true

class Category < ApplicationRecord
  include ActionView::Helpers::DateHelper

  belongs_to :user
  has_many :topics, dependent: :destroy

  def total_posts
    topics.sum { |topic| topic.posts.count }
  end

  def total_topics
    topics.count
  end

  def last_post_info
    last_post = topics.flat_map(&:posts).max_by(&:created_at)
    return nil unless last_post

    user = last_post.user
    time_ago = time_ago_in_words(last_post.created_at)

    "#{user.username} #{time_ago} ago"
  end

  def last_post_time
    topics.flat_map(&:posts).max_by(&:created_at)&.created_at
  end
end
