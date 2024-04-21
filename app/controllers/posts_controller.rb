# frozen_string_literal: true

class PostsController < ApplicationController
  include Pundit::Authorization

  before_action :set_topic, only: %i[show new create edit update destroy]
  before_action :set_post, only: %i[show edit update destroy]

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = Post.new
    @parent_post_id = params[:parent_post_id]
  end

  def create
    @topic = Topic.find(params[:topic_id])
    @post = @topic.posts.build(post_params)
    @post.user = current_user

    if params[:parent_post_id]
      parent_post = Post.find(params[:parent_post_id])
      @post.parent_post_id = parent_post.id
    end

    if @post.save
      redirect_to category_topic_path(@topic.category, @topic), notice: 'Post created!'
    else
      render :new
    end
  end

  def edit; end

  def update
    if @post.update(post_params)
      redirect_to category_topic_path(@topic.category, @topic), notice: 'Post updated!'
    else
      render :edit
    end
  end

  def destroy
    authorize @post
    @post.destroy

    flash[:notice] = 'Post has been deleted successfully'

    redirect_to category_topic_path(@topic.category, @topic), notice: 'Post deleted!'
  end

  private

  def set_topic
    @topic = Topic.find(params[:topic_id])
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:content, :parent_post_id)
  end
end
