class AddStickyToTopics < ActiveRecord::Migration[7.1]
  def change
    add_column :topics, :sticky, :boolean
  end
end
