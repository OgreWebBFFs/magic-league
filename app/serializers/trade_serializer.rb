class TradeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :status, :created_at, :updated_at, :id

  RARITY_ORDER = {
    'common' => 3,
    'uncommon' => 2,
    'rare' => 1,
    'mythic' => 0,
  }.freeze

  attribute :offer_date do |trade, params|
    trade.created_at.strftime("%b #{trade.created_at.day.ordinalize}")
  end

  attribute :current_user do |trade, params|
    trade.users.filter { |u| u == params[:user] }.map { |user| 
      {
        id: user.id,
        name: user.name,
        give_cards: self.get_give_cards(trade, user),
        receive_cards: self.get_receive_cards(trade, user),
      }
    }[0]
  end

  attribute :other_users do |trade, params|
    trade.users.filter { |u| u != params[:user] }.map{ |user| 
      {
        id: user.id,
        name: user.name,
        give_cards: self.get_give_cards(trade, user),
        receive_cards: self.get_receive_cards(trade, user),
      }
    }
  end
  
  private

  def self.get_give_cards (trade, user)
    user_exchanges = trade.exchanges.where('from_user_id = ?', user.id)
    user_exchanges.sort_by{ |exchange|
      RARITY_ORDER[exchange.card.rarity] || Float::INFINITY
    }.map { |exchange| {
      name: exchange.card.name,
      rarity: exchange.card.rarity[0].upcase
    }}
  end

  def self.get_receive_cards (trade, user)
    user_exchanges = trade.exchanges.where('to_user_id = ?', user.id)
    user_exchanges.sort_by{ |exchange|
      RARITY_ORDER[exchange.card.rarity] || Float::INFINITY
    }.map { |exchange| {
      name: exchange.card.name,
      rarity: exchange.card.rarity[0].upcase
    }}
  end

end
