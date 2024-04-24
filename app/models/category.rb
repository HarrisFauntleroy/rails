# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :user
  has_many :forums, dependent: :destroy

  validates :name, presence: true
end
