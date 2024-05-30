# frozen_string_literal: true

class User < ApplicationRecord
  include UserValidations
  include UserRelationships
  include UserScopes

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def self.todays_birthdays
    where('EXTRACT(month FROM date_of_birth) = ? AND EXTRACT(day FROM date_of_birth) = ?', Date.today.month,
          Date.today.day)
  end

  def self.upcoming_birthdays
    where(
      'EXTRACT(month FROM date_of_birth) > ? OR (EXTRACT(month FROM date_of_birth) = ? AND EXTRACT(day FROM date_of_birth) > ?)', Date.today.month, Date.today.month, Date.today.day
    )
  end
end
