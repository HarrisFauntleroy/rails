class AddParentPostIdToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :parent_post_id, :integer
  end
end
