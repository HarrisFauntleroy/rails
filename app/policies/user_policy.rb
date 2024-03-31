class UserPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
    def show?
      true # Anyone can view user profiles
    end

    def update?
      user.admin? || user == record
    end

    def destroy?
      user.admin? || user == record
    end
  end
end
