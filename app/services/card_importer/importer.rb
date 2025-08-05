module CardImporter
  class Importer
    REGEX = /^((\d+)?x?\s*)?(.*?)(?:\s*\(([a-zA-Z\d]{3})\))?$/
    COUNT = 2
    CARD_NAME = 3
    SET = 4

    def initialize(params)
      @card_list = params[:collection][:card_list]
      @collection = Collection.find(params[:id])
    end

    def save_cards
      raw_cards = CardImporter::Parser.new(@card_list).parse
      puts raw_cards.to_json
      if raw_cards.empty?
        return ["You cannot delete your entire collection in this way!"]
      end

      validator = CardImporter::Validator.new(raw_cards)

      if !validator.valid?      
        return validator.errors
      end

      # import cards if all cards found
      @collection.cards.destroy_all
      import_cards raw_cards

      return []
    end

    private

    def import_cards raw_cards
      raw_cards.each do |raw_card|
        card = Card.find_by(
          'lower(name) = :name AND (lower(set) = :set OR :set = \'\')',
          name: raw_card.name,
          set: raw_card.set
        )
        (1..raw_card.count).each do 
          @collection.add_card card
        end
      end
    end
  end
end