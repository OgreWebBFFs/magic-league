class TradeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :status, :created_at, :updated_at, :id

  attribute :offer_date do |trade, params|
    trade.created_at.strftime("%b #{trade.created_at.day.ordinalize}")
  end
  
  attribute :from do |trade, params|
    user = params[:user]
    {
      id: user.id,
      name: user.name,
      cards: trade.exchanges
        .select { |exchange| exchange.from_user_id == user.id }
        .flat_map(&:card)
    }
  end
  
  attribute :to do |trade, params|
    user = params[:user]
    {
      id: "1",
      name: trade.users.filter{ |_user| _user.id != user.id},
      cards: trade.exchanges
      .select { |exchange| exchange.to_user_id == user.id }
      .flat_map(&:card)
    }
  end
  
  private

  def get_from_cards (trade, user)
    user_exchanges = trade.exchanges.where('from_user_id = ?', user.id)
    user_exchanges.map { |exchange| trade.cards.find{ |card| card.id === exchange.card_id}}
  end

  def get_to_cards (trade, user)
    user_exchanges = trade.exchanges.where('to_user_id = ?', user.id)
    user_exchanges.map { |exchange| trade.cards.find{ |card| card.id === exchange.card_id}}
  end

end
