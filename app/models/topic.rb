# frozen_string_literal: true

class Topic < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :posts, dependent: :destroy

  def sticky?
    self.sticky
  end

  def mark_as_sticky!
    self.update(sticky: true)
  end

  def unmark_as_sticky!
    self.update(sticky: false)
  end

  def announcement?
    self.announcement
  end

  def mark_as_announcement!
    self.update(announcement: true)
  end

  def unmark_as_announcement!
    self.update(announcement: false)
  end
end
