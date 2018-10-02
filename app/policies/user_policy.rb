class UserPolicy < ApplicationPolicy
  def edit?
    user.id == record.id || is_admin?
  end
  def update?
    edit?
  end

  def permitted_attributes
    if is_admin?
      return [
        :name,
        :email,
        :admin,
      ]
    else
      return [
        :name,
      ]
    end
  end
end
