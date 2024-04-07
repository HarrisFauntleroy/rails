# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
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
    user.present? && (post.user == user || user.admin?)
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
end
