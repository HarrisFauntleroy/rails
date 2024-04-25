# frozen_string_literal: true

class CommentPolicy < ApplicationPolicy
  attr_reader :user, :comment

  def initialize(user, comment)
    @user = user
    @comment = comment
  end

  def index?
    true
  end

  def show?
    true
  end

  def create?
    user.present?
  end

  def edit?
    admin? || owner?
  end

  def update?
    edit?
  end

  def destroy?
    edit?
  end

  def create_comment?
    user.present?
  end
end
