# frozen_string_literal: true

class ForumPolicy < ApplicationPolicy
  attr_reader :user, :forum

  def initialize(user, forum)
    @user = user
    @forum = forum
  end

  def index?
    user.present? # Anyone logged in can view
  end

  def create?
    user.admin? # Only admins can create
  end

  def update?
    user.admin? || (user.moderator? && user.id == record.user_id) # Admins or the forum's moderator owner
  end

  def destroy?
    user.admin? || (user.moderator? && user.id == record.user_id) # Admins or the forum's moderator owner
  end

  def create_topic?
    user.present? # Anyone logged in can create a topic
  end
end
