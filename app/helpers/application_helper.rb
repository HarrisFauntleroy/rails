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

  def current_section
    if request.path.include?("/categories")
      "forums"
    elsif request.path.include?("/wikis")
      "wiki"
    elsif request.path.include?("/members")
      "member map"
    elsif request.path.include?("/users")
      "users"
    else
      "unknown"
    end
  end
end
