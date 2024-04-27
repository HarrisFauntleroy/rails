# frozen_string_literal: true

class CategoriesController < ApplicationController
  include Pundit::Authorization

  before_action :set_category, only: %i[show edit update destroy]
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def index
    @categories = Category.all.includes(:forums)
  end

  def new
    @category = Category.new(user: current_user)
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
  rescue ActiveRecord::RecordNotFound
    redirect_to errors_not_found_path, alert: 'Category not found.'
  end

  def category_params
    params.require(:category).permit(:name)
  end

  def user_not_authorized
    redirect_to root_path, alert: 'You are not authorized to perform this action.'
  end
end
