# frozen_string_literal: true

class BreadcrumbsComponent < ViewComponent::Base
  def initialize(items:)
    @items = items
  end
end
