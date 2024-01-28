class RenderMessage
  attr_accessor :content, :timestamp, :author  

  def initialize discord_msg
    heading_section = discord_msg.content.split("\n\n").first
    @id = discord_msg.id
    @heading = heading_section.split("\n").first
    @sub_heading = heading_section.sub("#{@heading}", "").sub("\n", "")
    @age = age discord_msg.timestamp
    @link = "https://discord.com/channels/#{ENV["DISCORD_SERVER_ID"]}/#{ENV["ANNOUNCEMENTS_DISCORD_CHANNEL_ID"]}/#{discord_msg.id}"
    @author = User.where("discord_id = ?", discord_msg.author.id.to_s).first
  end
  
  private

  def age timestamp
    current_time = Time.now
    elapsed_seconds = current_time - timestamp
  
    # Calculate minutes, hours, days, and weeks
    minutes = (elapsed_seconds / 60).to_i
    hours = (minutes / 60).to_i
    days = (hours / 24).to_i
    weeks = (days / 7).to_i

    if weeks > 0
      return age_str("week", weeks)
    elsif days > 0
      return age_str("day", days)
    elsif hours > 0
      return age_str("hour", hours)
    else
      return age_str("minute", minutes)
    end
  end

  def age_str(str, num)
    "#{num} #{num === 1 ? str : "#{str}s"}"
  end
end