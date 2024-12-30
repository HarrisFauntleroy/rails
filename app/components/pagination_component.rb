# frozen_string_literal: true

class PaginationComponent < ViewComponent::Base
  include Pagy::Frontend

  attr_reader :pagy, :records

  def initialize(pagy:, records:)
    super
    @pagy = pagy
    @records = records
  end

  def render?
    records.any?
  end
end
