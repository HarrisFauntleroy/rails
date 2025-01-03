# frozen_string_literal: true

class ErrorMessagesComponent < ViewComponent::Base
  include ActionView::Helpers::TextHelper

  def initialize(resource:)
    @resource = resource
    @errors = resource.errors.full_messages
  end

  private

  attr_reader :resource, :errors

  def render?
    errors.any?
  end
end
