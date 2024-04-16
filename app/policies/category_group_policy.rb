# frozen_string_literal: true

class CategoryGroupPolicy < ApplicationPolicy
  attr_reader :user, :category_group

  def initialize(user, category_group)
    @user = user
    @category_group = category_group
  end

  def index?
    user.present? # Anyone logged in can view
  end

  def create?
    user.admin? # Only admins can create
  end

  def update?
    user.admin? || (user.moderator? && user.id == record.user_id) # Admins or the category's moderator owner
  end

  def destroy?
    user.admin? || (user.moderator? && user.id == record.user_id) # Admins or the category's moderator owner
  end
end
