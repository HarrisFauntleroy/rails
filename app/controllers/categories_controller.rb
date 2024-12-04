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
      redirect_to forums_path, notice: t('.success')
    else
      flash.now[:error] = t('.failure')
      render :new
    end
  end

  def edit; end

  def update
    if @category.update(category_params)
      flash[:notice] = t('.success')
      redirect_to forums_path, notice: t('.success')
    else
      flash.now[:error] = t('.failure')
      render :edit
    end
  end

  def destroy
    authorize @category
    if @category.destroy
      flash[:notice] = t('.success')
      redirect_to forums_path, notice: t('.success')
    else
      flash.now[:error] = t('.failure')
      redirect_to forums_path, status: :unprocessable_entity
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
