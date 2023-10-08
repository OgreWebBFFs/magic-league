require_relative "draffle_messages"
require_relative "draffle_commands"

class DraffleActions
  include DraffleMessages
  include DraffleCommands

  def initialize(bot)
    @bot = bot
    register_cmds
  end

  def welcome
    send_draffle_msg DRAFFLE_WELCOME
  end

  def start draffle
    send_draffle_msg DRAFFLE_START % {name: draffle.name, board: draffle.board}
    send_draffle_pool_img
    send_draffle_msg DRAFFLE_YOUR_TURN % {discord_id: draffle.on_the_clock.discord_id}
  end

  def pause draffle
    send_draffle_msg DRAFFLE_PAUSE % {name: draffle.name}
  end

  private

  def send_draffle_msg msg
    @bot.send_message(ENV["DRAFFLE_DISCORD_CHANNEL_ID"], msg)
  end

  def send_draffle_pool_img
    @bot.send_file(ENV["DRAFFLE_DISCORD_CHANNEL_ID"], File.open("#{Rails.root}/draffle.png"), caption: "Here is the updated draft pool 👇")
  end

end
