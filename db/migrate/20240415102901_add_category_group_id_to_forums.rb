# frozen_string_literal: true

class AddCategoryGroupIdToForums < ActiveRecord::Migration[7.1]
  def change
    add_reference :forums, :category_group, null: false, foreign_key: true, default: 1
  end
end
