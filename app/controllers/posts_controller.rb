# frozen_string_literal: true

class PostsController < ApplicationController
  include Pundit

  before_action :set_post, only: %i[show edit update destroy]

  def index
    @posts = Post.all
    @current_user = current_user
  end

  def show
    @category = Category.find(params[:category_id])
    @topic = Topic.find(params[:topic_id])
    @post = Post.find(params[:id])
  end

  def new
    @category = Category.find(params[:category_id])
    @topic = Topic.find(params[:topic_id])
    @post = Post.new
    @current_user = current_user
  end

  def create
    @category = Category.find(params[:category_id])
    @topic = Topic.find(params[:topic_id])
    @post = @topic.posts.build(post_params)
    @post.user = current_user
    authorize @post

    if @post.save
      redirect_to category_topic_post_path(@category, @topic, @post), notice: "Post created!"
    else
      render :new
    end
  end

  def edit; end

  def update
    if @post.update(post_params)
      redirect_to category_topic_post_path(@post), notice: "Post updated!"
    else
      render :edit
    end
  end

  def destroy
    @post = Post.find(params[:id])
    authorize @post
    @post.destroy

    flash[:notice] = "Post has been deleted successfully"

    redirect_to posts_path, notice: "Post deleted!"
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end

  def post_params
    params.require(:post).permit(:content)
  end
end
