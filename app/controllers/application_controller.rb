# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit::Authorization
  include Pagy::Backend

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  before_action :authenticate_user!, only: %i[create edit update destroy]
  before_action :configure_permitted_parameters, if: :devise_controller?

  # This sets sidebar stats
  before_action :set_online_stats

  before_action :update_last_seen_at, if: :user_signed_in?

  helper_method :resource_name, :resource, :devise_mapping, :resource_class

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def resource_class
    User
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  def index
    @online_guests_count = 0
    @online_members_count = User.online.count
    @newest_member = User.order(created_at: :desc).first
    @most_ever_online = 0
  end

  def show; end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :username ])
    devise_parameter_sanitizer.permit(:account_update, keys: [ :username ])
  end

  def set_online_stats
    @online_stats = {
      online_guests_count: @online_guests_count,
      online_members_count: @online_members_count,
      newest_member: @newest_member,
      most_ever_online: @most_ever_online
    }
  end

  # def set_birthday_stats
  #   @today_birthdays = User.where("to_char(date_of_birth::date, 'MM-DD') = to_char(?, 'MM-DD')", Date.today)

  #   @next_birthdays = User.where("to_char(date_of_birth, 'MM-DD') > to_char(?, 'MM-DD')", Date.today)
  #                         .order(Arel.sql("to_char(date_of_birth, 'MM'), to_char(date_of_birth, 'DD')"))
  # end

  private

  def update_last_seen_at
    current_user.update_attribute(:last_seen_at, Time.current)
  end

  def user_not_authorized
    if user_signed_in?
      redirect_to root_path, alert: t("not_authorized")
    else
      redirect_to new_user_session_path, alert: t("please_sign_in")
    end
  end

  def record_not_found
    redirect_to errors_not_found_path, alert: t("record_not_found")
  end
end
