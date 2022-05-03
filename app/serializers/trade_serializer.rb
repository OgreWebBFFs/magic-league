class TradeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :status, :created_at, :updated_at
  
  attribute :from do |trade|
    {
      id: trade.from.id,
      name: trade.from.name,
      collection: trade.collections.where('user_id = ?', trade.from.id).first().id,
      cards: get_cards(trade.from, trade)
    }
  end
  
  attribute :to do |trade|
    {
      id: trade.to.id,
      name: trade.to.name,
      collection: trade.collections.where('user_id = ?', trade.to.id).first().id,
      cards: get_cards(trade.to, trade)
    }
  end
  
  private

  def self.get_cards (user, trade)
    user_collection = trade.collections.where('user_id = ?', user.id).first
    user_exchanges = trade.exchanges.where('collection_id = ?', user_collection)
    user_exchanges.map { |exchange| trade.cards.find{ |card| card.id === exchange.card_id}}
  end

end
