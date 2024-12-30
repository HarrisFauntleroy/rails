# frozen_string_literal: true

class ApplicationPolicy
  include Pundit::Authorization

  attr_reader :user, :record

  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      raise NotImplementedError, "You must define #resolve in #{self.class}"
    end

    private

    attr_reader :user, :scope
  end

  def initialize(user, record)
    @user = user
    @record = record
  end

  def own_record?
    user.present? && record.present? && user.id == record.id
  end

  def owner?
    user.present? && record.present? && record.user == user
  end

  def user?
    user.present?
  end

  def admin?
    user.present? && user.admin?
  end

  def moderator?
    user.present? && user.moderator?
  end

  def index?
    false
  end

  def show?
    false
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    false
  end

  def edit?
    update?
  end

  def destroy?
    false
  end
end
