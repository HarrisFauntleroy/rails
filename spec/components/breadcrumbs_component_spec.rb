# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BreadcrumbsComponent, type: :component do
  let(:breadcrumbs) do
    [
      { title: 'Home', path: '/' },
      { title: 'Forum', path: '/forum' },
      { title: 'Thread' }
    ]
  end

  it 'renders links for items with paths and text for those without' do
    render_inline(BreadcrumbsComponent.new(items: breadcrumbs))

    expect(rendered_component).to have_link('Home', href: '/')
    expect(rendered_component).to have_link('Forum', href: '/forum')
    expect(rendered_component).to have_text('Thread')
    expect(rendered_component).to have_selector('.forumlink', count: 2)
  end

  it 'renders separators correctly' do
    render_inline(BreadcrumbsComponent.new(items: breadcrumbs))
    rendered_text = rendered_component.to_html

    # Checking if '::' appears exactly twice (as there are three breadcrumbs and two separators needed)
    expect(rendered_text.scan('::').length).to eq(2)
    # Ensure no '::' after the last breadcrumb
    expect(rendered_text.strip).not_to end_with('::')
  end
end
