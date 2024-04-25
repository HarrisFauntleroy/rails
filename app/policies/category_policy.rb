# frozen_string_literal: true

class CategoryPolicy < ApplicationPolicy
  attr_reader :user, :category

  def initialize(user, category)
    @user = user
    @category = category
  end

  def index?
    true
  end

  def create?
    admin?
  end

  def update?
    admin? || (moderator? && owner?)
  end

  def destroy?
    admin? || (moderator? && owner?)
  end
end
