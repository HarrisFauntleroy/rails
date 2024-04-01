class UsersController < ApplicationController
  before_action :authenticate_admin!, only: [:index]
  before_action :authenticate_user!, only: [:show]

  def show
    @user = User.find(params[:id])

    @recent_topics_opened = @user.topics.order(created_at: :desc).limit(5)
    @recent_posts = @user.posts.order(created_at: :desc).limit(5)
    @total_posts = @user.posts.count
  rescue ActiveRecord::RecordNotFound => e
    redirect_to errors_not_found_path, alert: "User not found"
  end

  def index
    @users = User.all
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :timezone, :latitude, :longitude)
  end

  private

  def authenticate_admin!
    redirect_to root_path, alert: "You are not authorized to access this page." unless current_user && current_user.admin?
  end
end
