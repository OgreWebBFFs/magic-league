require 'uri'
require 'net/http'
require 'json'

include Rails.application.routes.url_helpers
discord = Rails.application.credentials.discord

API_ENDPOINT = 'https://discord.com/api/v10/oauth2/token'
CLIENT_ID = discord[:client_id]
CLIENT_SECRET = discord[:client_secret]

class Users::DiscordAccountController < ApplicationController

  def index
    code = request.params[:code]
    redirect_uri = "#{request.base_url}#{users_auth_discord_path()}"
    uri = URI(API_ENDPOINT)
    res = Net::HTTP.post_form(uri,
      'client_id' => CLIENT_ID,
      'client_secret' => CLIENT_SECRET,
      'code' => code,
      'grant_type' => 'authorization_code',
      'redirect_uri' => redirect_uri)
    puts JSON.parse(res.body)["access_token"]
  end

end