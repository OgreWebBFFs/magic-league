class CollectionPolicy < ApplicationPolicy
  def edit?
    user.collection.id == record.id
  end
  def update?
    edit?
  end
end
