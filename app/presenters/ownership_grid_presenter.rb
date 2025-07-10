class OwnershipGridPresenter
  def initialize(card, current_user)
    all_ownerships = card.ownerships + card.variants.flat_map { |variant| variant.ownerships }
    grouped_ownerships = all_ownerships.group_by { |o| o.collection_id }
    @rows = grouped_ownerships.map do |collection_id, ownerships|
      OwnershipGridRow.new(ownerships, current_user)
    end
  end
end

class OwnershipGridRow
  def initialize(ownerships, current_user)
    @user = ownerships.first.collection.user.slice(:id, :name)
    @total_quantity = ownerships.sum { |o| o["quantity"] }
    @quantity_by_set = ownerships.each_with_object(Hash.new(0)) do |ownership, hash|
      set_code = ownership.card.set
      hash[set_code] = ownership.quantity
    end
    @message_statuses = @user[:id] === current_user.id ? nil : ownerships.each_with_object(Hash.new(0)) do |ownership, hash|
      set_code = ownership.card.set
      puts @user[:id]
      hash[set_code] = ownership.card.message_statuses.where(from_user: current_user, to_user: @user[:id]).first&.updated_at || ""
    end
  end
end