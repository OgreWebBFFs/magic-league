class TradablePolicy < ApplicationPolicy
  def destroy?
    user.id == record.user_id
  end
end
