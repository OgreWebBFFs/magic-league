require 'discordrb'
require 'singleton'
require_relative 'draffle_actions'

class OgreBot < Discordrb::Bot
  include Singleton

  attr_reader :draffle_actions

  # @last_event_announcement = Time.now

  def initialize 
    super(token: Rails.application.credentials.dig(:discord, ENV["DISCORD_APP_ENV"].to_sym, :bot_secret))
    @draffle_actions = DraffleActions.new(self)

    self.message(in: ENV["ANNOUNCEMENTS_DISCORD_CHANNEL_ID"].to_i) do |event|
      Rails.cache.write('new_announcement', true, expires_in: 2.minutes)
    end
  end

end