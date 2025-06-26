class CollectionPolicy < ApplicationPolicy
  def edit?
    user.collection.id == record.id
  end
  def chaos_edit?
    edit?
  end
  def update?
    edit?
  end
  def bulk_edit? 
    edit?
  end
  def bulk_update? 
    edit?
  end
end
