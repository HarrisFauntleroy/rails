# frozen_string_literal: true

# == Schema Information
#
# Table name: topics
#
#  id             :bigint           not null, primary key
#  announcement   :boolean
#  comments_count :integer          default(0), not null
#  content        :text
#  sticky         :boolean
#  title          :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  forum_id       :integer          not null
#  user_id        :integer
#
# Indexes
#
#  index_topics_on_forum_id  (forum_id)
#  index_topics_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (forum_id => forums.id)
#
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
