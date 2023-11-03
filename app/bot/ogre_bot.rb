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

end