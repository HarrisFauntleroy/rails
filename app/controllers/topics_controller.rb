class TopicsController < ApplicationController
  include Pundit 
  
  before_action :set_topic, only: [:show, :edit, :update, :destroy]

  def index
    @topics = Topic.all
    @current_user = current_user
  end

  def show
    @category = Category.find(params[:category_id])
    @topic = Topic.find(params[:id]) 
  end

  def new
    @category = Category.find(params[:category_id])
    @topic = Topic.new
    @current_user = current_user
  end

  def create
    @category = Category.find(params[:category_id])
    @topic = @category.topics.build(topic_params)
    @topic.user = current_user
    authorize @topic
  
    if @topic.save
      redirect_to category_topic_path(@category, @topic), notice: 'Topic created!'
    else
      render :new
    end
  end

  def edit
    if @topic.update(topic_params)
      redirect_to category_topic_path(@category, @topic), notice: 'Topic updated!'
    else
      render :edit
    end
  end

  def update
    if @topic.update(topic_params)
      redirect_to category_topic_path(@category, @topic), notice: 'Topic updated!'
    else
      render :edit
    end
  end

  def destroy
    @topic = Topic.find(params[:id])
    authorize @topic
    @topic.destroy

    flash[:notice] = 'Topic has been deleted successfully'

    redirect_to category_topic_path(@category, @topic), notice: 'Topic deleted!'
  end

  private

  def set_topic
    @topic = Topic.find(params[:id])
  end

  def topic_params
    params.require(:topic).permit(:title, :content) 
 end
end
