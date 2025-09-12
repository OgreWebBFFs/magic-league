module CardImporter
  class Upserter
    def initialize(collection)
      @collection = collection
    end

    # Reconciles the collection to match raw_cards exactly:
    # - Upserts quantities for listed cards (preserving existing keeper flags)
    # - Removes ownerships for cards not present in raw_cards
    def upsert_cards(raw_cards)
      keep_card_ids = []
      ActiveRecord::Base.transaction do
        raw_cards.each do |raw_card|
          card = Card.find_by(
            'lower(name) = :name AND (lower(set) = :set OR :set = \'\')',
            name: raw_card.name,
            set: raw_card.set
          )

          next if card.nil?

          keep_card_ids << card.id

          ownership = @collection.ownerships.find_or_initialize_by(card: card)
          # Preserve keeper flag; only update quantity.
          ownership.quantity = raw_card.count
          ownership.save!
        end

        # Remove ownerships for cards not present in the new list
        @collection.ownerships.where.not(card_id: keep_card_ids).destroy_all
      end
    end
  end
end
