# frozen_string_literal: true

module ApplicationHelper
  include Pundit::Authorization

  def authorized_to_create?(record)
    policy(record).create?
  end

  def authorized_to_edit?(record)
    policy(record).edit?
  end

  def authorized_to_destroy?(record)
    policy(record).destroy?
  end
end
