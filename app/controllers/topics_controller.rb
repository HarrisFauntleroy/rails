# frozen_string_literal: true

class TopicsController < ApplicationController
  include Pundit::Authorization

  before_action :set_forum
  before_action :set_topic, only: %i[show edit update destroy]

  def index
    @topics = Topic.all
  end

  def show
    @topic = Topic.find(params[:id])

    breadcrumb_handler
  end

  def breadcrumb_handler
    add_breadcrumb '4hv.org', root_path
    add_breadcrumb 'Forums', forums_path
    add_breadcrumb @forum.name, @forum
    add_breadcrumb @topic.title, [@forum, @topic]
  end

  def new
    @topic = Topic.new
  end

  def create
    @topic = @forum.topics.build(topic_params)
    @topic.user = current_user
    authorize @topic

    if @topic.save
      redirect_to forum_topic_path(@forum, @topic), notice: 'Topic created!'
    else
      render :new
    end
  end

  def edit
    @topic = @forum.topics.find(params[:id])
  end

  def update
    @topic = @forum.topics.find(params[:id])

    if @topic.update(topic_params)
      redirect_to forum_topic_path(@forum, @topic), notice: 'Topic updated!'
    else
      render :edit
    end
  end

  def destroy
    authorize @topic
    @topic.destroy

    redirect_to forum_path(@forum), notice: 'Topic deleted!'
  end

  def toggle_sticky
    @topic = Topic.find(params[:id])
    authorize @topic, :toggle_sticky? # Assuming 'toggle_sticky?' policy exists

    if @topic.sticky?
      @topic.unmark_as_sticky!
    else
      @topic.mark_as_sticky!
    end

    redirect_to [@forum, @topic], notice: 'Topic stickiness updated.'
  end

  def toggle_announcement
    @topic = Topic.find(params[:id])
    authorize @topic, :toggle_announcement? # Assuming 'toggle_announcement?' policy exists

    if @topic.announcement?
      @topic.unmark_as_announcement!
    else
      @topic.mark_as_announcement!
    end

    redirect_to [@forum, @topic], notice: 'Topic stickiness updated.'
  end

  private

  def set_forum
    @forum = Forum.find(params[:forum_id])
  end

  def set_topic
    @topic = Topic.find(params[:id])
  end

  def topic_params
    params.require(:topic).permit(:title, :content, :sticky, :announcement, :forum_id, :user_id)
  end
end
