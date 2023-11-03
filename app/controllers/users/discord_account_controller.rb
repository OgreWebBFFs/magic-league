require 'uri'
require 'net/http'
require 'json'

include DiscordApi

class Users::DiscordAccountController < ApplicationController

  def index
    begin
      access_token = get_discord_access_token(request)
      discord_user = get_discord_user_info(access_token)
      current_user.register_discord(discord_user)
    rescue StandardError
      alert_msg = "There was an error linking your Discord account. Please try again later"
    else
      alert_msg = "Successfully linked Discord profile @#{discord_user["username"]}"
    end
    redirect_to edit_user_path(current_user.id), alert: alert_msg
  end

end