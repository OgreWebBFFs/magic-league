require 'uri'
require 'net/http'
require 'json'

module DiscordApiHelper

  discord = Rails.application.credentials.discord

  API_ENDPOINT_BASE = 'https://discord.com/api/v10/'
  CLIENT_ID = discord[:client_id]
  CLIENT_SECRET = discord[:client_secret]

  def get_discord_access_token(request)
    redirect_uri = "#{request.base_url}#{users_auth_discord_path()}"
    uri = URI("#{API_ENDPOINT_BASE}/oauth2/token")
    res = Net::HTTP.post_form(uri, 'client_id' => CLIENT_ID, 'client_secret' => CLIENT_SECRET, 'code' => request.params[:code], 'grant_type' => 'authorization_code', 'redirect_uri' => redirect_uri)
    if res.is_a?(Net::HTTPSuccess)
      JSON.parse(res.body)["access_token"]
    else
      raise StandardError.new JSON.parse(res.body)
    end
  end

  def get_discord_user_info(token)
    uri = URI("#{API_ENDPOINT_BASE}/users/@me")
    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = "Bearer #{token}"
    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http|
      http.request(req)
    }
    if res.is_a?(Net::HTTPSuccess)
      JSON.parse(res.body)
    else
      raise StandardError.new JSON.parse(res.body)
    end
  end


end