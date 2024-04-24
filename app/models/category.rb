# frozen_string_literal: true

class Category < ApplicationRecord
  include ActionView::Helpers::DateHelper

  belongs_to :user
  belongs_to :category_group
  has_many :topics, dependent: :destroy

  validates :name, presence: true

  def total_comments
    topics.sum { |topic| topic.comments.count }
  end

  def total_topics
    Topic.where(category_id: id).count
  end

  def last_comment_info
    last_comment = topics.flat_map(&:comments).max_by(&:created_at)
    return nil unless last_comment

    user = last_comment.user
    time_ago = time_ago_in_words(last_comment.created_at)

    "#{user&.username} #{time_ago} ago"
  end

  def last_comment_time
    topics.flat_map(&:comments).max_by(&:created_at)&.created_at
  end
end
