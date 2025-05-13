class Exchange < ApplicationRecord
  belongs_to :from_user, class_name: "User"
  belongs_to :to_user, class_name: "User"
  belongs_to :card
  belongs_to :trade
  
  def you_give_s
    "You give **#{card.name}** to  #{to_user.name}"
  end

  def you_get_s
    "You get **#{card.name}** from #{from_user.name}"
  end

  def others_s
    "#{to_user.name} gets **#{card.name}** from #{from_user.name}"   
  end

  def execute
    from_user.remove_card card
    to_user.add_card card
    unless card.rarity == 'common'
      tracked_trade = to_user.received_trades.find_or_initialize_by(rarity: card.received_trades_to_update)
      tracked_trade.increment
    end
  end

end
