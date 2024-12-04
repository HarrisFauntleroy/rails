# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :set_category, only: %i[show edit update destroy]

  def index
    @categories = Category.all.includes(:forums)
  end

  def show; end

  def new
    @category = Category.new(user: current_user)
    authorize @category
  end

  def create
    @category = Category.new(category_params)
    authorize @category

    if @category.save
      redirect_to forums_path, notice: t(".success")
    else
      render :new, status: :unprocessable_entity, flash: { error: t(".failure") }
    end
  end

  def edit; end

  def update
    if @category.update(category_params)
      redirect_to forums_path, notice: t(".success")
    else
      render :edit, status: :unprocessable_entity, flash: { error: t(".failure") }
    end
  end

  def destroy
    authorize @category
    if @category.destroy
      redirect_to forums_path, notice: t(".success")
    else
      redirect_to forums_path, status: :unprocessable_entity, flash: { error: t(".failure") }
    end
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :id)
  end
end
