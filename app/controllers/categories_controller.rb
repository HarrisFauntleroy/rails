class CategoriesController < ApplicationController
  include Pundit 
  
  before_action :set_category, only: [:show, :edit, :update, :destroy]

  def index
    @categories = Category.all
    @current_user = current_user
  end

  def show
    @category = Category.find(params[:id]) 
  end

  def new
    @category = Category.new
    @current_user = current_user
  end

  def create
    @category = Category.new(category_params)
    @category.user = current_user
    authorize @category # Authorize before saving

    if @category.save
      redirect_to categories_path, notice: 'Category created!'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @category.update(category_params)
      redirect_to category_path(@category), notice: 'Category updated!'
    else
      render :edit
    end
  end

  def destroy
    @category = Category.find(params[:id])
    authorize @category # Ensure Pundit authorization
    @category.destroy

    flash[:notice] = 'Category has been deleted successfully'

    redirect_to categories_path, notice: 'Category deleted!'
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name)
  end
end
