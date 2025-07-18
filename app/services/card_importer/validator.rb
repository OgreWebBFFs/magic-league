module CardImporter
  class Validator
    attr_accessor :errors

    def initialize(params)
      @errors = []
      @raw_cards = params

      missing_cards = @raw_cards.filter do |raw_card|
        card = Card.find_by(
          'lower(name) = :name AND (lower(set) = :set OR :set = \'\')',
          name: raw_card.name.downcase,
          set: raw_card.set.downcase
        )
        card.nil?
      end

      
      scryfall_check_cards, missing_cards = missing_cards.partition do |raw_card|
        !raw_card.nil? && raw_card.has_set
      end
      
      if scryfall_check_cards.any?
        @errors += ScryfallCardValidator.new(scryfall_check_cards).errors
      end

      @errors += missing_cards.map { |missing_card| "#{missing_card.name} not found. No set provided so no scryfall search was performed."}
    end

    def valid?
      @errors.empty?
    end
  end
  
  private

  class ScryfallCardValidator
    attr_accessor :errors

    def initialize(raw_cards)
      @errors = []
      validate_sets raw_cards
      query = build_query raw_cards
      @fetched_cards = ScryfallService.new(q: query).fetch

      raw_cards.each do |raw_card|
        if card_was_not_found raw_card
            @errors << "#{raw_card.name} (#{raw_card.set}) not found in scryfall search"
        end
      end
      if valid?
        @fetched_cards.each do |fetched_card|
          fetched_card.save!
        end
      end
    end

    private

    def validate_sets raw_cards
      raw_cards.each do |raw_card|
        if ConfigurationConstants::VALID_SETS.none? { |set| set[:code].downcase == raw_card.set }
          @errors << "#{raw_card.name} (#{raw_card.set}) is not part of a valid set"
        end
      end
    end

    def build_query raw_cards
      raw_cards.map {|raw_card| %Q((!"#{raw_card.name}" s:#{raw_card.set})) }.join(' or ')
    end

    def card_was_not_found raw_card
      @fetched_cards.none? { |fetched_card| fetched_card.name.downcase == raw_card.name && fetched_card.set.downcase == raw_card.set }
    end

    def valid?
      @errors.length == 0
    end
  end
end