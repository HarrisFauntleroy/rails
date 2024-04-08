# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  belongs_to :topic, dependent: :destroy

  belongs_to :parent_post, class_name: 'Post', optional: true
  has_many :replies, class_name: 'Post', foreign_key: :parent_post_id

  validates :content, presence: true
end
