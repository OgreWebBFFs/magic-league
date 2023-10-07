require 'discordrb'
require_relative './draffle_commands'

class OgreBot < Discordrb::Bot
  include DraffleCommands
  include Singleton

  def initialize 
    super(token: Rails.application.credentials.dig(:discord, :bot_secret))
    register_draffle_cmds
  end
  
  def say_hello(draffle)
    send_message(1158392994622361600, "#{draffle.name} has started!")
    send_file(1158392994622361600, File.open("#{Rails.root}/draffle.png"), caption: "Here is the draft pool 👇")
    send_message(1158392994622361600, "#{draffle.board.to_s}")
  end
end