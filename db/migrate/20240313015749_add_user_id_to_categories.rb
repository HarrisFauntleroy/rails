# frozen_string_literal: true

class AddUserIdToPostsTopicsCategories < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :user_id, :integer
    add_index :posts, :user_id

    add_column :topics, :user_id, :integer
    add_index :topics, :user_id

    # Add to categories if you want per-category ownership
    add_column :categories, :user_id, :integer
    add_index :categories, :user_id
  end
end
