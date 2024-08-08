require_relative 'trade_request_messages'

class TradeRequest
  include TradeRequestMessages


  def initialize(bot)
    @bot = bot
  end

  def ask_about_card to_user, from_user, card
    msg = TRADE_ASK % {name: from_user.name, card: card.name}
    @bot.pm_user(to_user.discord_id.to_i, msg)
  end

end