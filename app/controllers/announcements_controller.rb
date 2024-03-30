class AnnouncementsController < ApplicationController

  def index
    @announcement_msgs = OgreBot.instance.announcements_access.fetch(10).map do |message|
      RenderMessage.new(message)
    end
  end

end