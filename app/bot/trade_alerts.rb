class TradeAlerts

  def initialize(bot)
    @bot = bot
  end

  def trade_requested trade, review_link
    to_user = trade.to
    msg = <<~TEXT
      Hey there 👋 I'm just here to let you know you've got a trade request!

      #{trade.to_user_s}

      [Click here](#{review_link}) to review your trade
    TEXT
    discord_user = @bot.user(to_user.discord_id.to_i)
    discord_user.pm(msg)
  end

  def trade_accepted trade
    to_user = trade.to
    from_user = trade.from
    msg = <<~TEXT
      Your trade request to #{to_user.name} has been ✅*ACCEPTED*✅ 

      #{trade.from_user_s}

      Your card collection and trade allotments have been updated accordingly. Congratulations 🎉
    TEXT
    discord_user = @bot.user(from_user.discord_id.to_i)
    discord_user.pm(msg)
  end

  def trade_rejected trade
    to_user = trade.to
    from_user = trade.from
    msg = <<~TEXT
      The following trade request to #{to_user.name} was ❌*REJECTED*❌

      #{trade.from_user_s}

      You can reach out to them on discord @#{to_user.discord_username} to work out another deal.
    TEXT
    discord_user = @bot.user(from_user.discord_id.to_i)
    discord_user.pm(msg)
  end

end