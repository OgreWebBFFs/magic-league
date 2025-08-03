class TradeAlertService
  include Rails.application.routes.url_helpers

  def initialize trade_id
    @trade = Trade.find_by(id: trade_id)
  end

  def requested
    @trade.users.filter{ |user| !@trade.status.include? user.id.to_s }.each{ |user|
        trade_details = build_trade_details user
        request_link = "#{user_url user}#tab=trades"
        OgreBot.instance.trade_alerts.trade_requested user, trade_details, request_link
    }
  end

  def approved
    @trade.users.each{ |user|
        other_users = @trade.users.filter{ |u| u != user}.map{ |u| u.discord_tag }.join(' and ')
        trade_details = build_trade_details user
        OgreBot.instance.trade_alerts.trade_accepted user, other_users, trade_details
    }
  end

  def rejected
    @trade.users.each{ |user|
        other_users = @trade.users.filter{ |u| u != user}.map{ |u| u.discord_tag }.join(' and ')
        trade_details = build_trade_details user
        OgreBot.instance.trade_alerts.trade_rejected user, other_users, trade_details
    }
  end

  private

  def build_trade_details user
    trade_details = ""
    receive_exchanges = @trade.exchanges.filter{ |exchange| exchange.to_user == user}
    give_exchanges = @trade.exchanges.filter{ |exchange| exchange.from_user == user}
    other_exchanges = @trade.exchanges.filter{ |exchange| exchange.to_user != user && exchange.from_user != user }

    trade_details << "### Receiving:\n"
    receive_exchanges.each{ |exchange| trade_details << " - #{exchange.you_get_s}\n" }
    trade_details << "### Giving:\n"
    give_exchanges.each{ |exchange| trade_details << " - #{exchange.you_give_s}\n" }
    unless other_exchanges.empty?
        trade_details << "### Other Actions:\n"
        other_exchanges.each{ |exchange| trade_details << " - #{exchange.others_s}\n"}
    end
    trade_details
  end
end