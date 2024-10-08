require 'discordrb'
require 'singleton'
require_relative 'draffle_actions'
require_relative 'trade_alerts'
require_relative 'announcements_access'
require_relative 'trade_request'
require_relative '../service_objects/giphy_api'

include GiphyApi

class OgreBot < Discordrb::Bot
  include Singleton

  attr_reader :draffle_actions
  attr_reader :announcements_access
  attr_reader :trade_alerts
  attr_reader :trade_request

  def initialize 
    super(token: Rails.application.credentials.dig(:discord, ENV["DISCORD_APP_ENV"].to_sym, :bot_secret))
    @draffle_actions = DraffleActions.new(self)
    @announcements_access = AnnouncementsAccess.new(self)
    @trade_alerts = TradeAlerts.new(self)
    @trade_request = TradeRequest.new(self)
  end

  def pm_user discord_id, msg
    user = self.user discord_id
    if !user.nil?
      user.pm msg
    end
  end

  def congratulate_champ top_rank, date
    general_channel = self.channel ENV["GENERAL_DISCORD_CHANNEL_ID"]
    gif_uri = generate_random_gif 'clapping+congratulations'
    congratulations_msg = <<~TEXT
      ## A New Month, A New CHAMPION 🏆👑

      Please join me in congratulating **#{top_rank.user.discord_tag}** for their performance in the
      month of #{date.strftime('%B')}.

      They finished the month with an overall ELO of **#{top_rank.elo}** and a record of **#{plural_wins top_rank.wins} and #{plural_losses top_rank.losses}**.

      Congratulations 👏
      #{gif_uri}
    TEXT
    general_channel.send_message congratulations_msg
  end

  private
  def plural_wins wins
    wins != 1 ? "#{wins} wins" : "#{wins} win"
  end

  def plural_losses losses
    losses != 1 ? "#{losses} losses" : "#{losses} loss"
  end
end