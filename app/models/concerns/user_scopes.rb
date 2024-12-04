# frozen_string_literal: true

module UserScopes
  extend ActiveSupport::Concern

  included do
    today = Time.zone.today

    scope :todays_birthdays, lambda {
      where("EXTRACT(month FROM date_of_birth) = ? AND EXTRACT(day FROM date_of_birth) = ?", today.month, today.day)
    }

    scope :upcoming_birthdays, lambda {
      where(
        'EXTRACT(month FROM date_of_birth) > ? OR
        (EXTRACT(month FROM date_of_birth) = ? AND EXTRACT(day FROM date_of_birth) > ?)',
        today.month, today.month, today.day
      )
    }
  end
end
