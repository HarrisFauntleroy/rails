# frozen_string_literal: true

class TopicPolicy < ApplicationPolicy
  attr_reader :user, :topic

  def initialize(user, record)
    @user = user
    @record = record
    super
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
    owner?
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
