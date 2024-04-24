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
    user_is_admin?
  end

  def update?
    user_is_admin? || (user_is_moderator? || record_belongs_to_user?)
  end

  def destroy?
    user_is_admin? || (user_is_moderator? || record_belongs_to_user?)
  end

  private

  def record_belongs_to_user?
    user.present? && user.moderator? && user.id == record.user_id
  end

  def user_is_moderator?
    user.present? && user.moderator? && user.id == record.user_id
  end

  def user_is_admin?
    user.present? && user.admin?
  end
end
