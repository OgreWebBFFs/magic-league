require 'discordrb'
require 'singleton'
require_relative 'draffle_actions'

class OgreBot < Discordrb::Bot
  include Singleton

  attr_reader :draffle_actions

  def initialize 
    super(token: Rails.application.credentials.dig(:discord, ENV["DISCORD_APP_ENV"].to_sym, :bot_secret))
    @draffle_actions = DraffleActions.new(self)
  end

  def link_to_recent_announcement
    announcements_channel = self.channel ENV["ANNOUNCEMENTS_DISCORD_CHANNEL_ID"]
    latest_announcement = announcements_channel.history(1)[0]
    if Time.now - latest_announcement.timestamp < 864000
      "https://discord.com/channels/#{ENV["DISCORD_SERVER_ID"]}/#{ENV["ANNOUNCEMENTS_DISCORD_CHANNEL_ID"]}/#{latest_announcement.id}"
    else
      nil
    end
  end
end