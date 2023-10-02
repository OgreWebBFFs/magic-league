require 'discordrb'

DiscordChannelId = 1158392994622361600

module OgreBotHelper
  extend Discordrb::Interactions

  def send_msg
    Bot.send_message(DiscordChannelId, "Hello World!")
  end
end