module PrintsHelper
  def get_card_prints(card)
    set_q = "#{card.set},p#{card.set}"
    params = {:order => 'name', :unique => 'prints', :q => "e:#{set_q} #{card.name}" }
    uri = URI("https://api.scryfall.com/cards/search")
    uri.query = URI.encode_www_form(params)
    req = Net::HTTP::Get.new(uri)
    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http|
      http.request(req)
    }
    if res.is_a?(Net::HTTPSuccess)
      json_res = JSON.parse(res.body)
      json_res["data"].map { |card|
        if card["card_faces"]
          card = card["card_faces"].first
        end
        card["image_uris"]["normal"]
      }
    else
      raise StandardError.new JSON.parse(res.body)
    end
  end

end
