class CategoriesController < ApplicationController
  include Pundit 
  
  before_action :set_category, only: [:show, :edit, :update, :destroy]
  # A Rails callback. Executes `set_category` *before* running the actions: show, edit, update, and destroy.


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
    authorize @category

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
    authorize @category
    @category.destroy

    flash[:notice] = 'Category has been deleted successfully'

    redirect_to categories_path, notice: 'Category deleted!'
  end

  private

  def set_category
    @category = Category.find(params[:id])
      #  Finds a Category by ID. Used by the 'before_action' to streamline several actions. 
  end
  
  def category_params
    params.require(:category).permit(:name)
      # Defines "strong parameters" for security - Permits only the 'name' attribute in the parameters sent when creating/editing a category.
  end
end
