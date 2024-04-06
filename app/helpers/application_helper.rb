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
    case request.path
    when %r{/categories} then 'forums'
    when %r{/members}    then 'member map'
    when %r{/wikis}      then 'wiki'
    when %r{/chat_room} then 'chat room'
    else 'unknown'
    end
  end
end
