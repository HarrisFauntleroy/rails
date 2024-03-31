class UsersController < ApplicationController
  def show
    @user = User.find(params[:id]) 

    @recent_topics_opened = @user.topics.order(created_at: :desc).limit(5)

    @recent_posts = @user.posts.order(created_at: :desc).limit(5) 

    @total_posts = @user.posts.count 
  end
end