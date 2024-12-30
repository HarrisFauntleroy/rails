# frozen_string_literal: true

class ForumsController < ApplicationController
  before_action :set_forum, only: %i[show update destroy]
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def index
    @categories = Category.all.includes(forums: { topics: :comments })
    @presenter = ForumPresenter.new(@forum, view_context)
    @breadcrumbs = @presenter.breadcrumbs
  end

  def show
    @pagy, @topics = pagy(@forum.topics.includes(:user, :comments), items: 10)
    @presenter = ForumPresenter.new(@forum, view_context)
    @breadcrumbs = @presenter.breadcrumbs
    @users_presenter = UsersPresenter.new(User.all)
  end

  def new
    @forum = Forum.new(user: current_user)
  end

  def create
    @forum = current_user.forums.build(forum_params)
    authorize @forum

    if @forum.save
      redirect_to forums_path, notice: t(".success")
    else
      render :new
    end
  end

  def update
    if @forum.update(forum_params)
      redirect_to forums_path, notice: t(".success")
    else
      render :edit
    end
  end

  def destroy
    authorize @forum
    @forum.destroy

    redirect_to forums_path, notice: t(".success")
  end

  private

  def set_forum
    @forum = Forum.find(params[:id])
  end

  def forum_params
    params.require(:forum).permit(:name, :description, :category_id)
  end
end
