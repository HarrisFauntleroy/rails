# frozen_string_literal: true

module ApplicationHelper
  include Pundit::Authorization

  def page_title
    base_title = "4hv.org"
    return base_title if content_for(:title).blank?
    "#{content_for(:title)} | #{base_title}"
  end
end
