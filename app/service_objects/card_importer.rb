class CardImporter
  REGEX = /^((?<count>\d+)?(x)?\s*)?(?<card>.*)?$/
  COUNT = 0
  CARD_NAME = 1

  def initialize(params)
    @card_list = params[:collection][:card_list]
    @collection = Collection.find(params[:id])
    @errors = []
  end

  def save_cards
    cards_to_import = {}

    # SAMPLE INPUT
    # 1x Acclaimed Contender
    # All That Glitters
    # 2 Archon of Absolution
    # 6x Plains
    # 3x All That Glitters

    # Use regex to break card list out to an hash of card counts
    scanned_cards = @card_list.scan(REGEX)

    scanned_cards.each do |match|
      card_name = match[CARD_NAME].strip
      card_count = match[COUNT].nil? ? 1 : match[COUNT].to_i

      if cards_to_import[card_name]
        # card found, update count
        cards_to_import[card_name] += card_count
      else
        # new card, add it to hash
        cards_to_import[card_name] = card_count
      end
    end

    # loop through array of strings and do a card lookup
    # if card exists, add it to cards_to_import hash and update count
    # if card does not exist, push card name to errors array

    # preprocess cards for errors
    cards_to_import.each do |name, count|
      card = Card.find_by_name(name)
      if card.nil?
        @errors << "#{name} not found"
      end
    end

    # import cards if all cards found
    if @errors.empty?
      @collection.cards.destroy_all
      cards_to_import.each do |name, count|
        card = Card.find_by_name(name)
        (1..count).each do 
          @collection.cards << card
        end
      end
    end

    return @errors
  end
end
