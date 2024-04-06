# frozen_string_literal: true

class AddLastSeenAtAndDateOfBirthToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :last_seen_at, :datetime
    add_column :users, :date_of_birth, :date
  end
end
