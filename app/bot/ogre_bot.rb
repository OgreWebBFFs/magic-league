require 'discordrb'
require 'singleton'
require_relative 'draffle_actions'
require_relative 'announcements_access'
require_relative 'trade_alerts'

class OgreBot < Discordrb::Bot
  include Singleton

  attr_reader :draffle_actions
  attr_reader :announcements_access
  attr_reader :trade_alerts

  def initialize 
    super(token: Rails.application.credentials.dig(:discord, ENV["DISCORD_APP_ENV"].to_sym, :bot_secret))
    @draffle_actions = DraffleActions.new(self)
    @announcements_access = AnnouncementsAccess.new(self)
    @trade_alerts = TradeAlerts.new(self)
  end

end