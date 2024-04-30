# frozen_string_literal: true

class CommentsController < ApplicationController
  include Pundit::Authorization

  before_action :set_topic, only: %i[show new create edit update destroy]
  before_action :set_comment, only: %i[show edit update destroy]

  def index
    @comments = Comment.all
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def new
    @comment = Comment.new
    @parent_comment_id = params[:parent_comment_id]
  end

  def create
    @topic = Topic.find(params[:topic_id])
    @comment = @topic.comments.build(comment_params)
    @comment.user = current_user

    if params[:parent_comment_id]
      parent_comment = Comment.find(params[:parent_comment_id])
      @comment.parent_comment_id = parent_comment.id
    end

    if @comment.save
      update_comments_with_turbo_stream
    else
      render :new
    end
  end

  def edit; end

  def update
    if @comment.update(comment_params)
      redirect_to forum_topic_path(@topic.forum, @topic), notice: 'Comment updated!'
    else
      render :edit
    end
  end

  def destroy
    authorize @comment
    @comment.destroy

    flash[:notice] = 'Comment has been deleted successfully'

    redirect_to forum_topic_path(@topic.forum, @topic), notice: 'Comment deleted!'
  end

  private

  def set_topic
    @topic = Topic.find(params[:topic_id])
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:content, :parent_comment_id)
  end

  def update_comments_with_turbo_stream
    render turbo_stream:
      turbo_stream.replace("comments", partial: "comments/comments", locals: { topic: @topic })
  end
end
