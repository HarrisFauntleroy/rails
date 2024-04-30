module TopicHelper
  def toggle_sticky
    @topic = Topic.find(params[:id])
    authorize @topic, :toggle_sticky? # Assuming 'toggle_sticky?' policy exists

    if @topic.sticky?
      @topic.unmark_as_sticky!
    else
      @topic.mark_as_sticky!
    end

    redirect_to [@topic.forum, @topic], notice: 'Topic stickiness updated.'
  end

  def toggle_announcement
    @topic = Topic.find(params[:id])
    authorize @topic, :toggle_announcement? # Assuming 'toggle_announcement?' policy exists

    if @topic.announcement?
      @topic.unmark_as_announcement!
    else
      @topic.mark_as_announcement!
    end

    redirect_to [@topic.forum, @topic], notice: 'Topic stickiness updated.'
  end
end
