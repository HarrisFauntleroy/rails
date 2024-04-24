# frozen_string_literal: true

class AddDescriptionToForums < ActiveRecord::Migration[7.1]
  def change
    add_column :forums, :description, :string
  end
end
