# frozen_string_literal: true

class AddSignatureToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :signature, :string
  end
end
