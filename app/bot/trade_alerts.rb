require_relative 'trade_alert_messages'

class TradeAlerts
  include TradeAlertMessages


  def initialize(bot)
    @bot = bot
  end

  def trade_requested(to_user, trade_details, review_link)
    msg = TRADE_REQUESTED % {trade: trade_details, review_link: review_link}
    @bot.pm_user(to_user.discord_id.to_i, msg)
  end

  def trade_accepted to_user, other_users, trade_details
    msg = TRADE_ACCEPTED % {users: other_users, trade: trade_details}
    @bot.pm_user(to_user.discord_id.to_i, msg)
  end

  def trade_rejected to_user, other_users, trade_details
    msg = TRADE_REJECTED % {users: other_users, trade: trade_details}
    @bot.pm_user(to_user.discord_id.to_i, msg)
  end

  def trade_error trade, invalid_trade_targets
    to_user = trade.to
    from_user = trade.from
    invalid_trade_targets_s = invalid_trade_targets.map{ |target| "- #{target[:player]} has #{target[:reason]}: #{target[:card]}"}.join("\n")
    to_msg = TRADE_ERROR % {trade: trade.to_user_s, invalid_targets: invalid_trade_targets_s}
    from_msg = TRADE_ERROR % {trade: trade.from_user_s, invalid_targets: invalid_trade_targets_s}
    @bot.pm_user(to_user.discord_id.to_i, to_msg)
    @bot.pm_user(from_user.discord_id.to_i, from_msg)
  end

end