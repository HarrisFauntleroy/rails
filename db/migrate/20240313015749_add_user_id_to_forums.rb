# frozen_string_literal: true

class AddUserIdToForums < ActiveRecord::Migration[7.1]
  def change
    add_column :forums, :user_id, :integer
    add_index :forums, :user_id
  end
end
