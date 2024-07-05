class Collection < ApplicationRecord
  belongs_to :user
  has_many :ownerships
  has_many :cards, through: :ownerships

  def to_s
    ownerships.sort_by{ |o| o.card.name }.map{ |o| 
        "#{o.quantity}x #{o.card.name}"
    }.join("\n")
  end
end
