require 'discordrb'
require_relative 'draffle/draffle_actions'

class OgreBot < Discordrb::Bot
  include Singleton

  attr_reader :draffle_actions

  def initialize 
    super(token: Rails.application.credentials.dig(:discord, :bot_secret))
    @draffle_actions = DraffleActions.new(self)
  end

end