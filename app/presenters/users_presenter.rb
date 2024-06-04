# frozen_string_literal: true

class UsersPresenter
  def initialize(users)
    @users = users
  end

  def moderators_list
    @users.where(moderator: true).map(&:username).join(', ')
  end
end
