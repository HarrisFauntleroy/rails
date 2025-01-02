# frozen_string_literal: true

class EditButtonComponent < ViewComponent::Base
  def initialize(record:, policy:)
    @record = record
    @policy = policy
  end

  def render?
    @policy.edit?
  end
end
