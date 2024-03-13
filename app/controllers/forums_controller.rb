class CategoriesController < ApplicationController
  include Pundit

  before_action :set_category, only: [:show, :edit, :update, :destroy]

  def index
    @forums = Forum.all
    @current_user = current_user
  end

  def show
  end

  def new
    @forum = Forum.new
    @current_user = current_user
  end

  def create
    @forum = Forum.new(category_params)
    @forum.user = current_user
    authorize @forum # Authorize before saving

    puts "**** User is admin? #{user.admin?}"
    puts "**** Policy allows create? #{policy(@forum).create?}"

    if @forum.save
      redirect_to categories_path, notice: 'Forum created!'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @forum.update(category_params)
      redirect_to category_path(@forum), notice: 'Forum updated!'
    else
      render :edit
    end
  end

  def destroy
    @forum.destroy
    redirect_to categories_path, notice: 'Forum deleted!'
  end

  private

  def set_category
    @forum = Forum.find(params[:id])
  end

  def category_params
    params.require(:forum).permit(:name)
  end
end
