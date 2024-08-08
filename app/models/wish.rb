class Wish < ApplicationRecord
  belongs_to :user
  belongs_to :card

  def availablities
    card.ownerships.available.includes(collection: :user).where.not(collections: { user_id: user.id} ).as_json({
        include: { collection: { include: :user }}
    })
  end

  def total
    card.ownerships.sum(:quantity)
  end
end
