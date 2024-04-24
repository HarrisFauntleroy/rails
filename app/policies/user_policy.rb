# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  class Scope < Scope
    def resolve
      user.admin? ? scope.all : scope.none
    end
  end

  def index?
    return false unless user_exists?
    user.admin?
  end

  def show?
    user_exists? && record_exists?
  end

  def update?
    return false unless user_exists?
    user.admin? || user == record
  end

  def destroy?
    return false unless user_exists?
    (user.admin? && user != record) || (!user.admin? && user == record)
  end

  private

  def user_exists?
    user.present?
  end

  def record_exists?
    record.present?
  end
end
