# frozen_string_literal: true

class ForumPolicy < ApplicationPolicy
  attr_reader :user, :forum

  def initialize(user, forum)
    @user = user
    @forum = forum
  end

  def index?
    user.present?
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

  def create_topic?
    user.present?
  end
end
