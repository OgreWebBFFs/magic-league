require 'uri'
require 'net/http'
require 'json'

include DiscordApiHelper

class Users::DiscordAccountController < ApplicationController

  def index
    access_token = get_discord_access_token(request)
    discord_user = get_discord_user_info(access_token)
    current_user.register_discord(discord_user)
    redirect_to edit_user_path(current_user.id), alert: "Successfully linked Discord profile @#{discord_user["username"]}"
  end

end