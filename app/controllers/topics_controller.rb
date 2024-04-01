# frozen_string_literal: true

class TopicsController < ApplicationController
  include Pundit::Authorization

  before_action :set_topic, only: %i[show edit update destroy]

  def index
    @topics = Topic.all
    @current_user = current_user
  end

  def show
    @category = Category.find(params[:category_id])
    @topic = Topic.find(params[:id])

    add_breadcrumb "4hv.org", root_path
    add_breadcrumb "Forums", categories_path
    add_breadcrumb @category.name, category_path(@category)
    add_breadcrumb @topic.title, category_topic_path(@category, @topic)
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
      redirect_to category_topic_path(@category, @topic), notice: "Topic created!"
    else
      render :new
    end
  end

  def edit; end

  def update
    if @topic.update(topic_params)
      redirect_to category_topic_path(@category, @topic), notice: "Topic updated!"
    else
      render :edit
    end
  end

  def destroy
    @topic = Topic.find(params[:id])
    @category = @topic.category
    authorize @topic
    @topic.destroy

    redirect_to category_path(@category), notice: "Topic deleted!"
  end

  private

  def set_topic
    @topic = Topic.find(params[:id])
  end

  def topic_params
    params.require(:topic).permit(:title, :content)
  end
end
