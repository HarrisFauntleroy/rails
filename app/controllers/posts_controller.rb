class PostsController < ApplicationController
  before_action :set_category
  before_action :set_topic
  before_action :set_post, only: [:edit, :update, :destroy]

  def create
    @post = @topic.posts.new(post_params)
    if @post.save
      redirect_to category_topic_path(@category, @topic), notice: 'Post was successfully created.'
    else
      render 'topics/show'
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to category_topic_path(@category, @topic), notice: 'Post was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @post.destroy
    redirect_to category_topic_path(@category, @topic), notice: 'Post was successfully destroyed.'
  end

  private
    def set_category
      @category = Category.find(params[:category_id])
    end

    def set_topic
      @topic = @category.topics.find(params[:topic_id])
    end

    def set_post
      @post = @topic.posts.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:content)
    end
end
