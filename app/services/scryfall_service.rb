class ScryfallService
  SCRYFALL_SEARCH_URL = 'https://api.scryfall.com/cards/search'
  SCRYFALL_CARD_URL = 'https://api.scryfall.com/cards'
  
  def initialize(params = {})
    @params = params.symbolize_keys
  end

  def fetch
    query_string = build_query
    url = "#{SCRYFALL_SEARCH_URL}?q=#{URI.encode_www_form_component(query_string)}+unique:prints+-is:boosterfun+-is:promo+lang:en+game:paper"

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

  private

  def build_query
    parts = []

    # Handle name if present
    parts << %Q("#{ @params[:name] }") if @params[:name].present?

    # Handle set codes (s=)
    if @params[:s].present?
      set_codes = @params[:s].split(',').map(&:strip).join(',')
      parts << "s:#{set_codes}"
    end

    # Append any other custom parameters (e.g. type, rarity)
    @params.except(:name, :s).each do |key, value|
      parts << "#{key}:#{value}"
    end

    parts.join(' ')
  end
end