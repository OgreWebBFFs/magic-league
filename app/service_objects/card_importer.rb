class CardImporter
  REGEX = /^((\d+)?x?\s*)?(.*?)(?:\s*\(([a-zA-Z\d]{3})\))?$/
  COUNT = 2
  CARD_NAME = 3
  SET = 4

  def initialize(params)
    @card_list = params[:collection][:card_list]
    @collection = Collection.find(params[:id])
    @errors = []
  end

  def save_cards
    cards_to_import = {}
    cards_to_fetch = []
    # SAMPLE INPUT
    # 1x Acclaimed Contender (set)
    # All That Glitters (set)
    # 2 Archon of Absolution (se2)
    # 6x Plains
    # 3x All That Glitters

    @card_list.lines.each do |line|
      match = REGEX.match(line.strip)
      if match
        card_name = match[CARD_NAME].strip
        card_count = match[COUNT].nil? ? 1 : match[COUNT].to_i
        card_set = match[SET] || ""

        if cards_to_import[card_name+"|"+card_set]
          # card found, update count
          cards_to_import[card_name+"|"+card_set] += card_count
        else
          # new card, add it to hash
          cards_to_import[card_name+"|"+card_set] = card_count
        end
      end
    end

    # loop through array of strings and do a card lookup
    # if card exists, add it to cards_to_import hash and update count
    # if card does not exist, push card name to errors array

    # preprocess cards for errors
    if @card_list.empty?
      @errors << "You cannot delete your entire collection in this way!"
    else
      cards_to_import.each do |name_and_set, count|
        name = name_and_set.split("|")[0]
        set = name_and_set.split("|")[1]
        if set.blank?
          # Check db for card by just name
          card = Card.find_by('lower(name) = ?', name.downcase)
          if card.nil?
            @errors << "#{name} not found. No set provided so no scryfall search was performed."
          end
        else
          # check db for card by name and set
          card = Card.find_by('lower(name) = ? AND lower(set) = ?', name.downcase, set.downcase)
          if card.nil?
            # if card is not found in db, add it to a list to query against scryfall
            cards_to_fetch << {:name => name.downcase, :set => set.downcase}
          end
        end
      end
    end

    if cards_to_fetch.any?
      cards_query = cards_to_fetch.map {|card| %Q((!"#{card[:name]}" s:#{card[:set]})) }.join(' or ')
      fetched_cards = ScryfallService.new(q: cards_query).fetch
      cards_to_fetch.each do |card|
        if fetched_cards.none? { |fetched_card| fetched_card.name.downcase == card[:name] && fetched_card.set.downcase == card[:set] }
          @errors << "#{card[:name]} (#{card[:set]}) not found in scryfall search"
        end
      end
      if @errors.empty?
        fetched_cards.each { |fetched_card| fetched_card.save! }
      end
    end

    # # import cards if all cards found
    if @errors.empty?
      @collection.cards.destroy_all
      cards_to_import.each do |name_and_set, count|
        name = name_and_set.split("|")[0]
        set = name_and_set.split("|")[1]
        card = Card.find_by('lower(name) = ? AND lower(set) = ?', name.downcase, set.downcase)
        (1..count).each do 
          @collection.add_card card
        end
      end
    end

    return @errors
  end
end
