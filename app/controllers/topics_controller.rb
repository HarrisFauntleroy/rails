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

    @breadcrumbs = [
      { title: '4hv.org', path: root_path },
      { title: 'Forums', path: forums_path },
      { title: @forum.name, path: forum_path(@forum) },
      { title: @topic.title, path: forum_topic_path(@forum, @topic) }
    ]
  end

  def new
    @topic = Topic.new
  end

  def create
    @topic = @forum.topics.build(topic_params)
    @topic.user = current_user
    authorize @topic

    if @topic.save
      redirect_to forum_topic_path(@forum, @topic), flash: { success: 'Topic was successfully created.' }
    else
      flash.now[:error] = 'Topic could not be created.'
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
    authorize @topic, :toggle_sticky?

    if @topic.sticky?
      @topic.unmark_as_sticky!
    else
      @topic.mark_as_sticky!
    end

    redirect_to [@forum, @topic], notice: 'Topic stickiness updated.'
  end

  def toggle_announcement
    @topic = Topic.find(params[:id])
    authorize @topic, :toggle_announcement?

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
