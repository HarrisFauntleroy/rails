# frozen_string_literal: true

class UsersController < ApplicationController
  helper UserHelper

  before_action :set_user, only: %i[show]

  def index
    # Don't show users who haven't been seen.
    @users = User.all.where.not(last_seen_at: nil)
    authorize @users
  end

  def show
    authorize @user

    @recent_topics_opened = @user.topics.order(created_at: :desc).limit(5)
    @recent_comments = @user.comments.order(created_at: :desc).limit(5)
  rescue ActiveRecord::RecordNotFound
    redirect_to errors_not_found_path, alert: t("user_not_found")
  end

  def create; end

  def edit; end

  def update; end

  def destroy; end

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :timezone, :latitude, :longitude)
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to errors_not_found_path, alert: t("user_not_found")
  end
end
