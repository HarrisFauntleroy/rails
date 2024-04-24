# frozen_string_literal: true

class AddCategoryIdToForums < ActiveRecord::Migration[7.1]
  def change
    add_reference :forums, :category, null: false, foreign_key: true, default: 1
  end
end
