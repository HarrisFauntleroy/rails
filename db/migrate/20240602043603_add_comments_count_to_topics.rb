# frozen_string_literal: true

class AddCommentsCountToTopics < ActiveRecord::Migration[6.1]
  def change
    add_column :topics, :comments_count, :integer, default: 0, null: false

    Topic.find_each { |topic| Topic.reset_counters(topic.id, :comments) }
  end
end
