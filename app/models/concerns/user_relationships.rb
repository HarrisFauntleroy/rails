# frozen_string_literal: true

module UserRelationships
  extend ActiveSupport::Concern

  included do
    has_many :categories, dependent: :destroy
    has_many :forums, dependent: :destroy
    has_many :topics, dependent: :destroy
    has_many :comments, dependent: :destroy
  end
end
