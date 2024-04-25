# frozen_string_literal: true

class TopicPolicy
  attr_reader :user, :topic

  def initialize(user, topic)
    @user = user
    @topic = topic
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

  def create_topic?
    user.present?
  end
end
