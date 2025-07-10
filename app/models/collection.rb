class Collection < ApplicationRecord
  belongs_to :user
  has_many :ownerships
  has_many :cards, through: :ownerships

  def add_card card
    o = ownerships.find_or_create_by(card: card)
    puts o.to_json
    o.add
  end

  def remove_card card
    ownerships.find_by(card: card).remove
  end

  def to_s
    ownerships.sort_by{ |o| o.card.name }.map{ |o| 
        "#{o.quantity}x #{o.card.name} (#{o.card.set})"
    }.join("\n")
  end
end
