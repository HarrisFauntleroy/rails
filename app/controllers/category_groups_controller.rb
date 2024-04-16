class CategoryGroupsController < ApplicationController
  include Pundit::Authorization

  before_action :set_category_group, only: %i[show edit update destroy]

  def index
    @category_groups = CategoryGroup.all
    authorize @category_groups
  end

  def new
    @category_group = CategoryGroup.new
    authorize @category_group
  end

  def create
    @category_group = CategoryGroup.new(category_group_params)
    authorize @category_group

    if @category_group.save
      redirect_to categories_path, notice: 'Category group created!'
    else
      render :new
    end
  end

  def destroy
    authorize @category_group
    @category_group.destroy

    flash[:notice] = 'Category group has been deleted successfully'

    redirect_to categories_path, notice: 'Category group deleted!'
  end

  private

  def set_category_group
    @category_group = CategoryGroup.find(params[:id])
  end

  def category_group_params
    params.require(:category_group).permit(:name, :description)
  end
end
