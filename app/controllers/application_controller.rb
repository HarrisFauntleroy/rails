# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit::Authorization
  include DeviseHelper

  before_action :authenticate_user!, only: %i[create edit update destroy]
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_online_stats

  helper_method :resource_name, :resource, :devise_mapping, :resource_class

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end

  def set_online_stats
    @online_guests_count = 0
    @online_members_count = User.where('last_seen_at > ?', 10.minutes.ago).count
    @newest_member = User.order(created_at: :desc).first
    @most_ever_online = 0
  end

  # def set_birthday_stats
  #   @today_birthdays = User.where("to_char(date_of_birth::date, 'MM-DD') = to_char(?, 'MM-DD')", Date.today)

  #   @next_birthdays = User.where("to_char(date_of_birth, 'MM-DD') > to_char(?, 'MM-DD')", Date.today)
  #                         .order(Arel.sql("to_char(date_of_birth, 'MM'), to_char(date_of_birth, 'DD')"))
  # end
end
