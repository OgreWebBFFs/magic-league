class Wish < ApplicationRecord
  belongs_to :user
  belongs_to :card

  def availablities
    User
      .includes(:ownerships)
      .joins(:ownerships)
      .where(ownerships: { card_id: card.id })
      .where.not(id: user.id)
      .select('users.id as user_id, users.name AS user_name, ownerships.keeper AS keeper, ownerships.quantity as quantity')
  end

  def total
    card.ownerships.sum(:quantity)
  end
end
