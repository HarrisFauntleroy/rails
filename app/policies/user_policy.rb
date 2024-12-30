# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
    super
  end

  class Scope < ApplicationPolicy::Scope
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
    admin? || own_record?
  end

  def destroy?
    (admin? && !own_record?) || (!admin? && own_record?)
  end
end
