# frozen_string_literal: true

class TopicsController < ApplicationController
  include Pundit::Authorization

  before_action :set_category
  before_action :set_topic, only: %i[show edit update destroy]

  def index
    @topics = Topic.all
    @current_user = current_user
  end

  def show
    @topic = Topic.find(params[:id])

    add_breadcrumb '4hv.org', root_path
    add_breadcrumb 'Forums', categories_path
    add_breadcrumb @category.name, category_path(@category)
    add_breadcrumb @topic.title, category_topic_path(@category, @topic)
  end

  def new
    @topic = Topic.new
    @current_user = current_user
  end

  def create
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
    @topic = @category.topics.find(params[:id])
  end

  def update
    @topic = @category.topics.find(params[:id])

    if @topic.update(topic_params)
      redirect_to category_topic_path(@category, @topic), notice: 'Topic updated!'
    else
      render :edit
    end
  end

  def destroy
    @topic = Topic.find(params[:id])
    @category = @topic.category
    authorize @topic
    @topic.destroy

    redirect_to category_path(@category), notice: 'Topic deleted!'
  end


  def toggle_sticky
    @topic = Topic.find(params[:id])
    authorize @topic, :toggle_sticky? # Assuming 'toggle_sticky?' policy exists

    if @topic.sticky?
      @topic.unmark_as_sticky!
    else
      @topic.mark_as_sticky!
    end

    redirect_to [@category, @topic], notice: "Topic stickiness updated."
  end

  def toggle_announcement
    @topic = Topic.find(params[:id])
    authorize @topic, :toggle_announcement? # Assuming 'toggle_announcement?' policy exists

    if @topic.announcement?
      @topic.unmark_as_announcement!
    else
      @topic.mark_as_announcement!
    end

    redirect_to [@category, @topic], notice: "Topic stickiness updated."
  end

  private

  def set_category
    @category = Category.find(params[:category_id])
  end

  def set_topic
    @topic = Topic.find(params[:id])
  end

  def topic_params
    params.require(:topic).permit(:title, :content, :sticky, :announcement, :category_id, :user_id)
  end
end
