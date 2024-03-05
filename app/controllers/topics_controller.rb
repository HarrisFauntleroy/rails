class TopicsController < ApplicationController
  before_action :set_category
  before_action :set_topic, only: [:show, :edit, :update, :destroy]

  def index
    @topics = @category.topics
  end

  def show
  end

  def new
    @topic = @category.topics.new
  end

  def create
    @topic = @category.topics.new(topic_params)
    if @topic.save
      redirect_to [@category, @topic], notice: 'Topic was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @topic.update(topic_params)
      redirect_to [@category, @topic], notice: 'Topic was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @topic.destroy
    redirect_to category_topics_url(@category), notice: 'Topic was successfully destroyed.'
  end

  private
    def set_category
      @category = Category.find(params[:category_id])
    end

    def set_topic
      @topic = @category.topics.find(params[:id])
    end

    def topic_params
      params.require(:topic).permit(:title, :content)
    end
end
