class UserPolicy < ApplicationPolicy
  def edit?
    user.id == record.id || is_admin?
  end

  def update?
    edit?
  end
  
  def lock?
    is_admin?
  end
  
  def unlock?
    is_admin?
  end

  def permitted_attributes
    if is_admin?
      return [
        :name,
        :email,
        :admin,
        :locked_at
      ]
    else
      return [
        :name,
        :email,
        :pronouns,
      ]
    end
  end
end
