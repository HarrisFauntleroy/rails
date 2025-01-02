# frozen_string_literal: true

class DeleteButtonComponent < ViewComponent::Base
  def initialize(record:, policy:)
    @record = record
    @policy = policy
  end

  def render?
    @policy.destroy?
  end
end
