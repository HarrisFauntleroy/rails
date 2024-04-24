# frozen_string_literal: true

class Topic < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :comments, dependent: :destroy

  validates :title, presence: true

  def sticky?
    sticky
  end

  def mark_as_sticky!
    update(sticky: true)
  end

  def unmark_as_sticky!
    update(sticky: false)
  end

  def announcement?
    announcement
  end

  def mark_as_announcement!
    update(announcement: true)
  end

  def unmark_as_announcement!
    update(announcement: false)
  end
end
