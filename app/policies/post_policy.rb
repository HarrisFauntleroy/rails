# frozen_string_literal: true

class PostPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def create?
    user.present? # Require login
  end

  def edit?
    user.admin? || topic.user == user
  end

  def update?
    edit?
  end

  def destroy?
    edit?
  end

  def create_post?
    user.present?
  end
end
