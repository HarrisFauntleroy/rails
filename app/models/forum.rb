class Forum < ApplicationRecord
  belongs_to :user
  has_many :topics, dependent: :destroy
end 
