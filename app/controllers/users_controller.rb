# frozen_string_literal: true

class UsersController < ApplicationController
  include Pundit::Authorization

  helper UserHelper

  before_action :set_user, only: %i[show]

  def index
    @users = User.all
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
