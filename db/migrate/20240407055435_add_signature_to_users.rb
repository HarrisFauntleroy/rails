class AddSignatureToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :signature, :string
  end
end
