# frozen_string_literal: true

class CategoryPolicy < ApplicationPolicy
  attr_reader :user, :category

  def initialize(user, category)
    @user = user
    @category = category
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

  def create_topic?
    user.present? # Anyone logged in can create a topic
  end
end
