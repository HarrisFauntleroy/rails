class PostsController < ApplicationController
  include Pundit 
  
  before_action :set_topic, only: [:new, :create]

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
    @post = Post.new(post_params)
    @post.user = current_user
    authorize @post
  
    if @post.save
      redirect_to topic_post_path(@topic, @post), notice: 'Post created!' # Change here
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to post_path(@post), notice: 'Post updated!'
    else
      render :edit
    end
  end

  def destroy
    @post = Post.find(params[:id])
    authorize @post # Ensure Pundit authorization
    @post.destroy
    redirect_to posts_path, notice: 'Post deleted!'
  end

  private

  def set_topic
    @topic = Topic.find(params[:topic_id])
  end

  def post_params
    params.require(:post).permit(:title, :content) 
 end
end
