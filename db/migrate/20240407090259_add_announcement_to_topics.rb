# frozen_string_literal: true

class AddAnnouncementToTopics < ActiveRecord::Migration[7.1]
  def change
    add_column :topics, :announcement, :boolean
  end
end
