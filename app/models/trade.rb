class Trade < ApplicationRecord
  has_many :exchanges
  has_many :cards, through: :exchanges

  validates :status, acceptance: { accept: ['pending', 'approved', 'rejected', 'error']}

  private
  
  def to_cards
    self.exchanges.where('user_id = ?', self.to.id).map{ |exch| exch.card }
  end

  def from_cards
    self.exchanges.where('user_id = ?', self.from.id).map{ |exch| exch.card }
  end

end
