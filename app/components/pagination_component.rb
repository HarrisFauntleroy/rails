# app/components/pagination_component.rb
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

  def page_links
    links = []

    # Add the "go to page" text
    links << content_tag(:span, I18n.t("go_to_page"))
    links << "&nbsp;"

    1.upto(pagy.pages) do |number|
      if number == pagy.page
        links << content_tag(:span, number, class: "nextprev_current", style: "text-decoration:underline")
      else
        # Skip pages in the middle with ellipsis
        if pagy.pages > 7 && number > 3 && number < pagy.pages - 2 && number != pagy.page
          if links.last != "..."
            links << "..."
          end
          next
        end
        links << link_to(number, url_for(page: number), class: "nextprev_link")
      end
    end

    safe_join(links, " ")
  end
end
