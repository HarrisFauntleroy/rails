class CategoryGroup < ApplicationRecord
  belongs_to :user
  has_many :categories, dependent: :destroy

  validates :name, presence: true
end
