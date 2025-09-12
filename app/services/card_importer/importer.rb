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
      if raw_cards.empty?
        return ["You cannot delete your entire collection in this way!"]
      end

      validator = CardImporter::Validator.new(raw_cards)

      if !validator.valid?      
        return validator.errors
      end

      # Update quantities for existing cards and add new ones without destroying others
      CardImporter::Upserter.new(@collection).upsert_cards(raw_cards)

      return []
    end

    private
  end
end
