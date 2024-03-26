class AnnouncementsController < ApplicationController

  def index
    @announcement_msgs = OgreBot.instance.announcements_access.fetch(10).map do |message|
      RenderMessage.new(message)
    end
    cookies[:announcements_viewed] =  { value: DateTime.now, expires: 10.days }
  end

end