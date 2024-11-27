# frozen_string_literal: true

class CategoryPolicy < ApplicationPolicy
  attr_reader :user, :category

  def initialize(user, record)
    @user = user
    @record = record
    super
  end

  def index?
    true
  end

  def create?
    admin? || moderator?
  end

  def update?
    admin? || (moderator? && owner?)
  end

  def destroy?
    admin? || (moderator? && owner?)
  end
end
