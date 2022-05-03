class TradeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :status, :created_at, :updated_at

  attribute :offer_date do |trade|
    trade.created_at.strftime("%b #{trade.created_at.day.ordinalize}")
  end
  
  attribute :from do |trade|
    {
      id: trade.from.id,
      name: trade.from.name,
      cards: get_cards(trade.from, trade)
    }
  end
  
  attribute :to do |trade|
    {
      id: trade.to.id,
      name: trade.to.name,
      cards: get_cards(trade.to, trade)
    }
  end
  
  private

  def self.get_cards (user, trade)
    user_exchanges = trade.exchanges.where('user_id = ?', user.id)
    user_exchanges.map { |exchange| trade.cards.find{ |card| card.id === exchange.card_id}}
  end

end
