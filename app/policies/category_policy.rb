class CategoryPolicy < ApplicationPolicy
  attr_reader :user, :category

  def initialize(user, category)
    @user = user
    @category = category
  end

  def index?
    true
  end

  def show?
    true
  end

  def create?
    user.admin?
  end

  def edit?
    user.admin
  end

  def update?
    edit?
  end

  def destroy?
    edit?
  end

  def create_topic?
    user.present?
  end
end
