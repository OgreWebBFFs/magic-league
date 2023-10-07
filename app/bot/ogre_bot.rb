require 'discordrb'
require_relative './draffle_commands'
require_relative './bot_messages'

class OgreBot < Discordrb::Bot
  include DraffleCommands
  include BotMessages
  include Singleton

  def initialize 
    super(token: Rails.application.credentials.dig(:discord, :bot_secret))
    register_draffle_cmds
  end

  def draffle_welcome
    send_message(1158392994622361600, draffle_welcome_msg)
  end

  def draffle_start(draffle)
    send_message(1158392994622361600, "#{draffle.name} has started!")
    send_message(1158392994622361600, "Here is our selection order:\n#{draffle.board.to_s}")
    send_file(1158392994622361600, File.open("#{Rails.root}/draffle.png"), caption: "Here are the cards available to draft 👇")
    send_message(1158392994622361600, "⚡ <@#{draffle.on_the_clock.discord_id}> you now wield the power of the `/pick` command. *Use it wisely...*")
  end

  def draffle_pause(draffle)
    send_message(1158392994622361600, "#{draffle.name} has been paused. The power of the `/pick` command has been temporarily reovked.")
  end

end