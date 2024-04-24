# frozen_string_literal: true

class ForumComponent < ViewComponent::Base
  include Pundit::Authorization
  include Devise::Controllers::Helpers

  attr_reader :forum

  def initialize(forum:)
    @forum = forum
  end
end
