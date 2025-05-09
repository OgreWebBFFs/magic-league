class Trade < ApplicationRecord
  has_many :exchanges
  has_many :cards, through: :exchanges

  validates :status, acceptance: { accept: ['pending', 'approved', 'rejected', 'error']}

  def users
    User.where(id: exchanges.pluck(:from_user_id, :to_user_id).flatten.uniq)
  end

  private
  
  def to_cards
    self.exchanges.where('user_id = ?', self.to.id).map{ |exch| exch.card }
  end

  def from_cards
    self.exchanges.where('user_id = ?', self.from.id).map{ |exch| exch.card }
  end

end
