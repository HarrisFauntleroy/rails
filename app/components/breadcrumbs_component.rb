# frozen_string_literal: true

class BreadcrumbsComponent < ViewComponent::Base
  def initialize(items:)
    @breadcrumbs = items
  end
end
