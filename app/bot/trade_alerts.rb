require_relative 'trade_alert_messages'

class TradeAlerts
  include TradeAlertMessages


  def initialize(bot)
    @bot = bot
  end

  def trade_requested trade, review_link
    to_user = trade.to
    msg = TRADE_REQUESTED % {trade: trade.to_user_s, review_link: review_link}
    @bot.pm_user(to_user.discord_id.to_i, msg)
  end

  def trade_accepted trade
    to_user = trade.to
    from_user = trade.from
    msg = TRADE_ACCEPTED % {user: to_user.name, trade: trade.from_user_s}
    @bot.pm_user(from_user.discord_id.to_i, msg)
  end

  def trade_rejected trade
    to_user = trade.to
    from_user = trade.from
    msg = TRADE_REJECTED % {user: to_user.name, trade: trade.from_user_s, discord: to_user.discord_username}
    @bot.pm_user(from_user.discord_id.to_i, msg)
  end

  def trade_error trade, invalid_trade_targets
    to_user = trade.to
    from_user = trade.from
    invalid_trade_targets_s = invalid_trade_targets.map{ |target| "- #{target[:player]} has #{target[:reason]}: #{target[:card]}"}.join("\n")
    to_msg = TRADE_ERROR % {trade: trade.to_user_s, invalid_targets: invalid_trade_targets_s}
    from_msg = TRADE_ERROR % {trade: trade.from_user_s, invalid_targets: invalid_trade_targets_s}
    @bot.pm_user(to_user.discord_id.to_i, to_msg)
    @bot.pm_user(from_user.discord_id.to_i, to_msg)
  end

end