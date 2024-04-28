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
end
