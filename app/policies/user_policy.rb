# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.none
      end
    end
  end

  def index?
    user.present? && user.admin?
  end

  def show?
    record.present? && user.present?
  end

  def update?
    user.admin? || (user.present? && user == record)
  end

  def destroy?
    user.admin? && user != record || (user.present? && user == record && user.admin? == false)
  end
end
