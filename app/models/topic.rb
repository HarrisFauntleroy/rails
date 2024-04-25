# frozen_string_literal: true

class Topic < ApplicationRecord
  belongs_to :user
  belongs_to :forum
  has_many :comments, dependent: :destroy

  validates :title, presence: true

  def sticky?
    sticky
  end

  def mark_as_sticky!
    update(sticky: true) unless sticky?
  end

  def unmark_as_sticky!
    update(sticky: false) if sticky?
  end

  def announcement?
    announcement
  end

  def mark_as_announcement!
    update(announcement: true) unless announcement?
  end

  def unmark_as_announcement!
    update(announcement: false) if announcement?
  end
end
