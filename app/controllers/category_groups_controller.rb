# frozen_string_literal: true

class CategoriesController < ApplicationController
  include Pundit::Authorization

  before_action :set_category, only: %i[show edit update destroy]

  def index
    @categories = Category.all.includes(:forums)
  end

  def new
    @category = Category.new
    authorize @category
  end

  def create
    @category = Category.new(category_params)
    authorize @category

    if @category.save
      redirect_to forums_path, notice: 'Category created!'
    else
      render :new
    end
  end

  def destroy
    authorize @category
    @category.destroy

    flash[:notice] = 'Category has been deleted successfully'

    redirect_to forums_path, notice: 'Category deleted!'
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :description)
  end
end
