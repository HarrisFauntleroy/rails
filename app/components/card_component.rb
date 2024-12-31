class CardComponent < ViewComponent::Base
  def initialize(title:, id: nil)
    @title = title
    @id = id
  end

  private

  attr_reader :title, :id
end
