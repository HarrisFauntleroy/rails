# frozen_string_literal: true

class CategoryComponent < ViewComponent::Base
  include Pundit::Authorization
  include Devise::Controllers::Helpers

  attr_reader :category

  def initialize(category:)
    @category = category
  end
end
