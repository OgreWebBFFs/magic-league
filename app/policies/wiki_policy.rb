class WikiPolicy < ApplicationPolicy
  def edit?
    is_admin?
  end

  def update?
    is_admin?
  end
  
  def destroy?
    is_admin?
  end
  
  def new?
    is_admin?
  end
end
