# frozen_string_literal: true

class PostsController < ApplicationController
  include Pundit::Authorization

  before_action :set_category
  before_action :set_topic, only: %i[show new create edit update destroy]
  before_action :set_post, only: %i[show edit update destroy]

  def index
    @posts = Post.all
    @current_user = current_user
  end

  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = Post.new
    @current_user = current_user
  end

  def create
    @post = @topic.posts.build(post_params)
    @post.user = current_user
    authorize @post

    if @post.save
      redirect_to category_topic_path(@category, @topic, @post), notice: 'Post created!'
    else
      render :new
    end
  end

  def edit
    @topic = @category.topics.find(params[:id])
    @post = @topic.posts.find(params[:id])
  end

  def update
    @topic = @category.topics.find(params[:id])
    @post = @topic.posts.find(params[:id])

    if @post.update(post_params)
      redirect_to category_topic_post_path(@category, @topic, @post), notice: 'Post updated!'
    else
      render :edit
    end
  end

  def destroy
    @post = Post.find(params[:id])
    authorize @post
    @post.destroy

    flash[:notice] = 'Post has been deleted successfully'

    redirect_to category_topic_path, notice: 'Post deleted!'
  end

  private

  def set_category
    @category = Category.find(params[:category_id])
  end

  def set_topic
    @topic = @category.topics.find(params[:topic_id])
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:content)
  end
end
