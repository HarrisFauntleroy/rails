# frozen_string_literal: true

class CategoriesController < ApplicationController
  include Pundit::Authorization

  before_action :set_category_group, only: %i[show edit update destroy]
  before_action :set_category, only: %i[show edit update destroy]

  def index
    @category_groups = CategoryGroup.all.includes(categories: { topics: :posts })
    @current_user = current_user

    add_breadcrumb '4hv.org', root_path
    add_breadcrumb 'Forums', categories_path
  end

  def show
    @category = Category.find(params[:id])

    breadcrumb_handler
  end

  def breadcrumb_handler
    add_breadcrumb '4hv.org', root_path
    add_breadcrumb 'Forums', categories_path
    add_breadcrumb @category.name, category_path(@category)
  end

  def new
    @category = Category.new
    @current_user = current_user
  end

  def create
    @category = current_user.categories.build(category_params)
    authorize @category

    if @category.save
      redirect_to categories_path, notice: 'Category created!'
    else
      render :new
    end
  end

  def edit; end

  def update
    if @category.update(category_params)
      redirect_to categories_path, notice: 'Category updated!'
    else
      render :edit
    end
  end

  def destroy
    authorize @category
    @category.destroy

    flash[:notice] = 'Category has been deleted successfully'

    redirect_to categories_path, notice: 'Category deleted!'
  end

  private

  def set_category_group
    @category_group = CategoryGroup.find(params[:category_group_id])
  end

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :description, :category_group_id)
  end
end
