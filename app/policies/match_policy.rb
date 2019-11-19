class MatchPolicy < ApplicationPolicy
  def edit?
    is_admin?
  end

  def update?
    edit?
  end
  
  def destroy?
    is_admin?
  end
end
