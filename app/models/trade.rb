class Trade < ApplicationRecord
  belongs_to :from, class_name: 'User', foreign_key: 'from_user'
  belongs_to :to, class_name: 'User', foreign_key: 'to_user'

  has_many :exchanges
  has_many :cards, through: :exchanges

  validates :from, :to, presence: true
  validates :status, acceptance: { accept: ['pending', 'approved', 'rejected', 'error']}

  def to_user_s
    <<~TEXT
      ### #{from.name} receives:
      #{self.to_cards.map{ |card| "- #{card.name}"}.join("\n")}
      ### You receive:
      #{self.from_cards.map{ |card| "- #{card.name}"}.join("\n")}
    TEXT
  end

  def from_user_s
    <<~TEXT
      ### You receive:
      #{self.to_cards.map{ |card| "- #{card.name}"}.join("\n")}
      ### #{to.name} receives:
      #{self.from_cards.map{ |card| "- #{card.name}"}.join("\n")}
    TEXT
  end

  private
  
  def to_cards
    self.exchanges.where('user_id = ?', self.to.id).map{ |exch| exch.card }
  end

  def from_cards
    self.exchanges.where('user_id = ?', self.from.id).map{ |exch| exch.card }
  end

end
