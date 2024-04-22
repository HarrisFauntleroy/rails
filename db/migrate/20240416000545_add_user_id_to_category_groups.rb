# frozen_string_literal: true

class AddUserIdToCategoryGroups < ActiveRecord::Migration[7.1]
  def change
    add_reference :category_groups, :user, null: false, foreign_key: true, default: 1
  end
end
