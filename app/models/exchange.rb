class Exchange < ApplicationRecord
  belongs_to :from_user, class_name: "User"
  belongs_to :to_user, class_name: "User"
  belongs_to :card
  belongs_to :trade
  
  def execute
    from_user.remove_card card
    to_user.add_card card
    unless card.rarity == 'common'
      tracked_trade = to_user.received_trades.find_or_initialize_by(rarity: card.received_trades_to_update)
      tracked_trade.increment
    end
  end

end
