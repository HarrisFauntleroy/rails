# frozen_string_literal: true

class ForumsController < ApplicationController
  include Pundit::Authorization

  # before_action :set_category, only: %i[show edit update destroy]
  before_action :set_forum, only: %i[show edit update destroy]

  def index
    @categories = Category.all.includes(forums: { topics: :comments })

    add_breadcrumb '4hv.org', root_path
    add_breadcrumb 'Forums', forums_path
  end

  def show
    @forum = Forum.find(params[:id])

    breadcrumb_handler
  end

  def breadcrumb_handler
    add_breadcrumb '4hv.org', root_path
    add_breadcrumb 'Forums', forums_path
    add_breadcrumb @forum.name, @forum
  end

  def new
    @forum = Forum.new
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

  def set_category
    @category = Category.find(params[:category_id])
  end

  def set_forum
    @forum = Forum.find(params[:id])
  end

  def forum_params
    params.require(:forum).permit(:name, :description, :category_id)
  end
end
