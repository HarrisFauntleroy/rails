# frozen_string_literal: true

module UserScopes
  extend ActiveSupport::Concern

  included do
    scope :todays_birthdays, lambda {
                               where('EXTRACT(month FROM date_of_birth) = ? AND EXTRACT(day FROM date_of_birth) = ?', Date.today.month, Date.today.day)
                             }
    scope :upcoming_birthdays, lambda {
                                 where('EXTRACT(month FROM date_of_birth) > ? OR (EXTRACT(month FROM date_of_birth) = ? AND EXTRACT(day FROM date_of_birth) > ?)', Date.today.month, Date.today.month, Date.today.day)
                               }
  end
end
