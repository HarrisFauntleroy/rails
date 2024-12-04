# frozen_string_literal: true

# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  content           :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  parent_comment_id :integer
#  topic_id          :integer          not null
#  user_id           :integer
#
# Indexes
#
#  index_comments_on_topic_id  (topic_id)
#  index_comments_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (topic_id => topics.id)
#
class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :topic, counter_cache: true
  belongs_to :parent_comment, class_name: 'Comment', optional: true

  has_many :replies, class_name: 'Comment', foreign_key: :parent_comment_id, dependent: :nullify, inverse_of: :parent_comment

  validates :content, presence: true
end
