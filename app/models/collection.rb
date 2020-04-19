class Collection < ApplicationRecord
  belongs_to :user
  has_many :ownerships
  has_many :cards, through: :ownerships

  def to_s
    cards.select(:name).group(:name).order(:name).map{ |card|
      "#{self.cards.where(name: card.name).count}x #{card.name}"
    }.join("\n")
  end
end
