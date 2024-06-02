# frozen_string_literal: true

module UserValidations
  extend ActiveSupport::Concern

  included do
    validates :username, presence: true, uniqueness: true, length: { in: 3..25 }
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { minimum: 8 }, format: {
      with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*\z/,
      message: 'must include at least one lowercase letter, one uppercase letter, one digit, and one special character'
    }
    validates :timezone, inclusion: {
      in: ActiveSupport::TimeZone.all.map(&:name),
      message: 'is not a valid time zone'
    }, allow_blank: true
    validates :latitude, numericality: {
      greater_than_or_equal_to: -90, less_than_or_equal_to: 90
    }, allow_blank: true
    validates :longitude, numericality: {
      greater_than_or_equal_to: -180, less_than_or_equal_to: 180
    }, allow_blank: true
  end
end
