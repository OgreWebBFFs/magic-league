require 'uri'
require 'net/http'
require 'json'

module GiphyApi
  API_BASE = 'https://api.giphy.com/v1/gifs/random'
  API_KEY = ENV["GIPHY_API_KEY"]

  def generate_random_gif q
    api_params = {
      api_key: API_KEY,
      tag: q,
      rating: 'pg-13'
    }
    uri = URI("#{API_BASE}?#{URI.encode_www_form(api_params)}")
    response = Net::HTTP.get_response(uri)

    if response.is_a?(Net::HTTPSuccess)
      gif_data = JSON.parse(response.body)
      return gif_data['data']['url']
    else
      puts "Error fetching random GIF: #{response.code} - #{response.message}"
      return nil
    end

  end
end