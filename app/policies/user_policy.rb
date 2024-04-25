# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  class Scope < Scope
    def resolve
      admin? ? scope.all : scope.none
    end
  end

  def index?
    admin?
  end

  def show?
    user.present? && record.present?
  end

  def update?
    admin? || owner?
  end

  def destroy?
    (admin? && !owner?) || (!admin? && owner?)
  end
end
