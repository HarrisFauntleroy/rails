# frozen_string_literal: true

class CommentsController < ApplicationController
  include Pundit::Authorization

  before_action :set_topic, only: %i[show new create edit update destroy]
  before_action :set_comment, only: %i[show edit update destroy]

  def index
    @comments = Comment.all
  end

  def show; end

  def new
    @comment = Comment.new
    @parent_comment_id = params[:parent_comment_id]
  end

  def create
    @comment = build_comment
    set_parent_comment if params[:parent_comment_id]

    if @comment.save
      redirect_to forum_topic_path(@topic.forum, @topic), notice: t(".success")
    else
      render :new, status: :unprocessable_entity, flash: { error: t(".failure") }
    end
  end

  def edit; end

  def update
    if @comment.update(comment_params)
      redirect_to forum_topic_path(@topic.forum, @topic), notice: t(".success")
    else
      render :edit, status: :unprocessable_entity, flash: { error: t(".failure") }
    end
  end

  def destroy
    authorize @comment

    if @comment.destroy
      redirect_to forum_topic_path(@topic.forum, @topic), notice: t(".success")
    else
      render :show, status: :unprocessable_entity, flash: { error: t(".failure") }
    end
  end

  private

  def set_topic
    @topic = Topic.find(params[:topic_id])
  end

  def build_comment
    @topic.comments.build(comment_params).tap do |comment|
      comment.user = current_user
    end
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def set_parent_comment
    parent_comment = Comment.find(params[:parent_comment_id])
    @comment.parent_comment_id = parent_comment.id
  end

  def comment_params
    params.require(:comment).permit(:content, :parent_comment_id)
  end
end
