class ScryfallService
  SCRYFALL_SEARCH_URL = 'https://api.scryfall.com/cards/search'
  SCRYFALL_CARD_URL = 'https://api.scryfall.com/cards'
  
  def initialize(params = {})
    @params = params.symbolize_keys
  end

  def fetch
    url = "#{SCRYFALL_SEARCH_URL}?q=#{URI.encode_www_form_component(@params[:q])}+unique:prints+-is:boosterfun+-is:promo+lang:en+game:paper"

    begin
      response = RestClient.get(url)
      scryfall_cards = JSON.parse(response)["data"]
      scryfall_cards.map{|card|
        Card.create_from_scryfall_response(card, true)
      }.sort_by { |card| card['name'].downcase }
    rescue RestClient::ExceptionWithResponse => e
      puts "Scryfall error: #{e.response.code} - #{e.response.body}"
      []
    rescue JSON::ParserError
      []
    end
  end

  def fetch_and_create_card
    url = "#{SCRYFALL_CARD_URL}/#{@params[:id]}"
    puts url
    begin
      response = RestClient.get(url);
      Card.create_from_scryfall_response JSON.parse(response)
    rescue RestClient::ExceptionWithResponse => e
      puts "Scryfall error: #{e.response.code} - #{e.response.body}"
      nil
    rescue JSON::ParserError
      nil
    end
  end
end