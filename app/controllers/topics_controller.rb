class TopicsController < ApplicationController
  include Pundit 
  
  before_action :set_category, only: [:new, :create]

  def index
    @topics = Topic.all
    @current_user = current_user
  end

  def show
    @topic = Topic.find(params[:id]) 
  end

  def new
    @topic = Topic.new
    @current_user = current_user
  end

  def create
    @topic = Topic.new(topic_params)
    @topic.user = current_user
    authorize @topic
  
    if @topic.save
      redirect_to category_topic_path(@category, @topic), notice: 'Topic created!' # Change here
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @topic.update(topic_params)
      redirect_to topic_path(@topic), notice: 'Topic updated!'
    else
      render :edit
    end
  end

  def destroy
    @topic = Topic.find(params[:id])
    authorize @topic # Ensure Pundit authorization
    @topic.destroy
    redirect_to topics_path, notice: 'Topic deleted!'
  end

  private

  def set_category
    @category = Category.find(params[:category_id])
  end

  def topic_params
    params.require(:topic).permit(:title, :content) 
 end
end
