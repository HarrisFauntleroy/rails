# frozen_string_literal: true

class ForumPresenter
  def initialize(forum, view_context)
    @forum = forum
    @view_context = view_context
  end

  def breadcrumbs
    crumbs = [
      { title: '4hv.org', path: @view_context.root_path },
      { title: 'Forums', path: @view_context.forums_path }
    ]

    return unless @forum

    crumbs << { title: @forum.name, path: @view_context.forum_path(@forum) }
  end
end
