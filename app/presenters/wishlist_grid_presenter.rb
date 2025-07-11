class WishlistGridPresenter
  def initialize(card)
    all_variant_wishes = [card].concat(card.variants).flat_map{ |c| c.wishes }
    all_user_wishers = all_variant_wishes.uniq { |w| w.user_id }.map{ |w| w.user }
    @rows = all_user_wishers.map do |user|
      WishlistRow.new(user, card)
    end
    puts @rows.to_json
  end
end

class WishlistRow
  def initialize(user, card)
    @id = user.id
    @name = user.name
    @count = Ownership
      .joins(:card)
      .where(collection_id: user.collection.id)
      .where('cards.name = ?', card.name) # or `.where(user_id: user.id)` if ownership belongs to user
      .sum(:quantity)
  end
end