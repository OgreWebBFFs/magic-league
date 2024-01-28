class AnnouncementsAccess

  def initialize(bot)
    @bot = bot
    listener
  end

  def fetch num
    announcements_channel = @bot.channel ENV["ANNOUNCEMENTS_DISCORD_CHANNEL_ID"]
    announcements_channel.history(num)
  end

  private

  def listener
    @bot.message(in: ENV["ANNOUNCEMENTS_DISCORD_CHANNEL_ID"].to_i) do |event|
      Rails.cache.write('new_announcement', true, expires_in: 2.minutes)
    end
  end

end