# frozen_string_literal: true

module ApplicationHelper
  require 'redcarpet'
  require 'rouge'
  require 'rouge/plugins/redcarpet'

  class HTMLWithRouge < Redcarpet::Render::Safe
    include Rouge::Plugins::Redcarpet
  end

  def markdown(text)
    renderer = HTMLWithRouge.new(
      with_toc_data: true,
      prettify: true,
      hard_wrap: true
    )

    extensions = {
      autolink: true,
      no_intra_emphasis: true,
      fenced_code_blocks: true,
      lax_spacing: true,
      strikethrough: true,
      superscript: true,
      tables: true,
      underline: true,
      highlight: true,
      quote: true,
      footnotes: true
    }

    markdown = Redcarpet::Markdown.new(renderer, extensions)
    markdown.render(text).html_safe
  end
end
