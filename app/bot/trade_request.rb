class TradeRequest

  def initialize(bot)
    @bot = bot
  end

  def ask_about_card to_user, from_user, card, wishlist_cards
    msg = "#{from_user.name} is interested in trading for your #{card.discord_link}"
    if (wishlist_cards.length > 0)
      msg += "\n\nThey own the following cards on your wishlist\n"
      msg += wishlist_cards.map {|card| "- #{card.discord_link}"}.join("\n")
    end
    msg += "\n\nYou can message them back by clicking here -> <@#{from_user.discord_id}>"
    @bot.pm_user(to_user.discord_id.to_i, msg)
  end

end