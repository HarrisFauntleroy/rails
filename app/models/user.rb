# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :username, presence: true, uniqueness: true, length: { minimum: 3, maximum: 25 }

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :password, length: { minimum: 8 }, allow_nil: true
  validates :password,
            format: {
              with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*\z/,
              message: 'must include at least one lowercase letter, one uppercase letter, one digit, and one special character'
            },
            allow_nil: true

  validates :timezone, inclusion: { in: ActiveSupport::TimeZone.all.map(&:name), message: 'is not a valid time zone' },
                       allow_blank: true
  validates :latitude, numericality: { greater_than_or_equal_to: -90, less_than_or_equal_to: 90 }, allow_blank: true
  validates :longitude, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }, allow_blank: true

  has_many :categories
  has_many :forums
  has_many :topics
  has_many :comments

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
