class TopicPolicy
  attr_reader :user, :topic

  def initialize(user, topic)
    @user = user
    @topic = topic
  end

  def index?
    true
  end

  def show?
    true
  end

  def create?
    user.present? 
  end

  def edit?
    user.present? && (topic.user == user || user.admin?)
  end

  def update?
    edit?
  end

  def destroy?
    edit?
  end

  def create_post?
    user.present? 
  end

  def create_topic?
    user.present? 
  end
end