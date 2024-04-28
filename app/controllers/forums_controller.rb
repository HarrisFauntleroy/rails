# frozen_string_literal: true

class ForumsController < ApplicationController
  include Pundit::Authorization

  before_action :set_forum, only: %i[show edit update destroy]
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def index
    @categories = Category.all.includes(forums: { topics: :comments })
    @breadcrumbs = [
      { title: '4hv.org', path: root_path },
      { title: 'Forums', path: forums_path }
    ]
  end

  def show
    @forum = Forum.find(params[:id])
    @breadcrumbs = [
      { title: '4hv.org', path: root_path },
      { title: 'Forums', path: forums_path },
      { title: @forum.name, path: forum_path(@forum) }
    ]
  end

  def new
    @forum = Forum.new(user: current_user)
  end

  def create
    @forum = current_user.forums.build(forum_params)
    authorize @forum

    if @forum.save
      redirect_to forums_path, notice: 'Forum created!'
    else
      render :new
    end
  end

  def edit; end

  def update
    if @forum.update(forum_params)
      redirect_to forums_path, notice: 'Forum updated!'
    else
      render :edit
    end
  end

  def destroy
    authorize @forum
    @forum.destroy

    flash[:notice] = 'Forum has been deleted successfully'

    redirect_to forums_path, notice: 'Forum deleted!'
  end

  private

  def set_forum
    @forum = Forum.find(params[:id])
  end

  def forum_params
    params.require(:forum).permit(:name, :description, :category_id)
  end
end
