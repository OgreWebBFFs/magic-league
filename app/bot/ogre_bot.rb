require 'discordrb'
require_relative './draffle_commands'

class OgreBot < Discordrb::Bot
  include DraffleCommands

  def initialize 
    super(token: Rails.application.credentials.dig(:discord, :bot_secret))
    send_message(1158392994622361600, "Hello World!")
    register_cmds
  end

end