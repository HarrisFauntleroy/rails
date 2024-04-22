# frozen_string_literal: true

class AddCategoryGroupIdToCategories < ActiveRecord::Migration[7.1]
  def change
    add_reference :categories, :category_group, null: false, foreign_key: true, default: 1
  end
end
