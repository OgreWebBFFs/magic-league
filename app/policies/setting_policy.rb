class SettingPolicy < ApplicationPolicy
  def edit?
    is_admin?
  end

  def update?
    edit? 
  end
end
