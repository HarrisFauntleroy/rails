# frozen_string_literal: true

# == Schema Information
#
# Table name: forums
#
#  id          :bigint           not null, primary key
#  description :string
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :bigint           default(1), not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_forums_on_category_id  (category_id)
#  index_forums_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#  fk_rails_...  (user_id => users.id)
#
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
