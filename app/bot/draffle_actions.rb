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
    send_draffle_msg draffle.welcome
  end

  def start draffle
    round_strs = draffle.board.to_s.split(/\n(?=Round \d+)/)
    round_strs[0] = DRAFFLE_START % {name: draffle.name} + round_strs[0]
    round_strs.each do |round_str|
      send_draffle_msg round_str
    end
  end

  def pause draffle
    send_draffle_msg DRAFFLE_PAUSE % {name: draffle.name}
  end

  def end draffle
    send_draffle_pool_img DRAFFLE_END % {name: draffle.name}
  end

  def complete draffle
    send_draffle_msg DRAFFLE_COMPLETE % {name: draffle.name}
  end

  def notify_next user
    send_draffle_pool_img DRAFFLE_YOUR_TURN % {discord_tag: user.discord_tag}
  end

  def announce_pick user, prize
    send_draffle_msg DRAFFLE_ANNOUNCE_PICK % {discord_tag: user.discord_tag, prize: prize.name}
  end

  def announce_autopick user, prize
    send_draffle_msg DRAFFLE_ANNOUNCE_AUTOPICK % {discord_tag: user.discord_tag, prize: prize.name} 
  end

  def autodraft_warning(num)
    draffle = Draffle.find_by status: 'started'
    time = Autodraft::Manager.autopick_time
    user = draffle.on_the_clock
    warnings = Array[
      DRAFFLE_AUTODRAFT_WARNING % {warning: "Autodraft Warning #1", discord_tag: user.discord_tag, time: time},
      DRAFFLE_AUTODRAFT_WARNING % {warning: "Autodraft Warning #2", discord_tag: user.discord_tag, time: time},
      DRAFFLE_AUTODRAFT_WARNING % {warning: "**FINAL Autodraft Warning**", discord_tag: user.discord_tag, time: time}
    ]
    send_draffle_msg warnings[num]
  end

  private

  def send_draffle_msg msg, split_on = nil
    draffle = Draffle.where.not(status: "completed").first
    @bot.send_message(draffle.discord_thread_id, msg)
  end

  def send_draffle_pool_img text
    draffle = Draffle.where.not(status: "completed").first
    draffle.draffle_img.blob.open do |tmpfile|
      @bot.send_file(draffle.discord_thread_id, File.open(tmpfile), caption: "Here is the updated draft pool 👇 #{text}")
    end
  end

end
