require_relative 'trade_alert_messages'

class TradeAlerts
  include TradeAlertMessages


  def initialize(bot)
    @bot = bot
  end

  def trade_requested trade, review_link
    to_user = trade.to
    msg = TRADE_REQUESTED % {trade: trade.to_user_s, review_link: review_link}
    discord_user = @bot.user(to_user.discord_id.to_i)
    discord_user.pm(msg)
  end

  def trade_accepted trade
    to_user = trade.to
    from_user = trade.from
    msg = TRADE_ACCEPTED % {user: to_user.name, trade: trade.from_user_s}
    discord_user = @bot.user(from_user.discord_id.to_i)
    discord_user.pm(msg)
  end

  def trade_rejected trade
    to_user = trade.to
    from_user = trade.from
    msg = TRADE_REJECTED % {user: to_user.name, trade: trade.from_user_s, discord: to_user.discord_username}
    discord_user = @bot.user(from_user.discord_id.to_i)
    discord_user.pm(msg)
  end

  def trade_error trade, invalid_trade_targets
    to_user = trade.to
    from_user = trade.from
    invalid_trade_targets_s = invalid_trade_targets.map{ |target| "- #{target[:player]} has #{target[:reason]}: #{target[:card]}"}.join("\n")
    to_msg = TRADE_ERROR % {trade: trade.to_user_s, invalid_targets: invalid_trade_targets_s}
    from_msg = TRADE_ERROR % {trade: trade.from_user_s, invalid_targets: invalid_trade_targets_s}
    to_discord_user = @bot.user(to_user.discord_id)
    from_discord_user = @bot.user(from_user.discord_id)
    to_discord_user.pm(to_msg)
    from_discord_user.pm(from_msg)
  end

end