# frozen_string_literal: true

class Forum < ApplicationRecord
  include ActionView::Helpers::DateHelper

  belongs_to :user
  belongs_to :category
  has_many :topics, dependent: :destroy

  validates :name, presence: true

  def total_comments
    Comment.joins(:topic).where(topics: { forum_id: id }).count
  end

  def total_topics
    Topic.where(forum_id: id).count
  end

  def last_comment
    Comment.joins(:topic).where(topics: { forum_id: id }).order(created_at: :desc).first
  end

  def last_comment_info
    return nil unless (last_comment = self.last_comment)

    "#{last_comment.user.username} #{time_ago_in_words(last_comment.created_at)} ago"
  end

  def last_comment_time
    last_comment&.created_at
  end
end
