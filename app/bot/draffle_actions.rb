require_relative "draffle_messages"
require_relative "draffle_commands"

class DraffleActions
  include DraffleMessages
  include DraffleCommands

  def initialize(bot)
    @bot = bot
    register_cmds
  end

  def welcome draffle
    draffle_channel = @bot.channel ENV["DRAFFLE_DISCORD_CHANNEL_ID"]
    thread = draffle_channel.start_thread(
      draffle.name,
      10080,
    )
    draffle.update discord_thread_id: thread.id
    send_draffle_msg DRAFFLE_WELCOME
  end

  def start draffle
    send_draffle_msg DRAFFLE_START % {name: draffle.name, board: draffle.board}
  end

  def pause draffle
    send_draffle_msg DRAFFLE_PAUSE % {name: draffle.name}
  end

  def end draffle
    send_draffle_msg DRAFFLE_END % {name: draffle.name}
  end

  def notify_next user
    send_draffle_pool_img DRAFFLE_YOUR_TURN % {discord_id: user.discord_id}
  end

  def announce_pick user, prize
    send_draffle_msg DRAFFLE_ANNOUNCE_PICK % {name: user.name, discord_id: user.discord_id, prize: prize.name}
  end

  def announce_autopick user, prize
    send_draffle_msg DRAFFLE_ANNOUNCE_AUTOPICK % {name: user.name, discord_id: user.discord_id, prize: prize.name} 
  end

  def autodraft_warning(num)
    draffle = Draffle.find_by status: 'started'
    picker = draffle.on_the_clock
    warnings = Array["⏳ Warning 1", "Warning 2", "Final Warning"]
    send_draffle_msg warnings[num]
  end

  private

  def send_draffle_msg msg
    draffle = Draffle.where.not(status: "completed").first
    @bot.send_message(draffle.discord_thread_id, msg)
  end

  def send_draffle_pool_img text
    draffle = Draffle.where.not(status: "completed").first
    @bot.send_file(draffle.discord_thread_id, File.open("#{Rails.root}/draffle.png"), caption: "Here is the updated draft pool 👇 #{text}")
  end

end
