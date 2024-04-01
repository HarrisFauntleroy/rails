# frozen_string_literal: true

class Topic < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :posts, dependent: :destroy
end
