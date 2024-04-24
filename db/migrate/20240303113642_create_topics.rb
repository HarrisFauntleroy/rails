# frozen_string_literal: true

class CreateTopics < ActiveRecord::Migration[7.1]
  def change
    create_table :topics do |t|
      t.string :title
      t.text :content
      t.references :forum, null: false, foreign_key: true

      t.timestamps
    end
  end
end
