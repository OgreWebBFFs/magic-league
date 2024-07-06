class OwnershipManager
  def initialize(params)
    @card_id = params[:card_id]
    @collection_id = params[:collection_id]
    @quantity = params[:quantity]&.to_i
    @tradable = params[:tradable]
    @ownership = Ownership.find_or_create_by(card_id: @card_id, collection_id: @collection_id)
  end

  def update_quantity
    if @quantity == 0
        @ownership.destroy
    else
        @ownership.update(quantity: @quantity)
    end
  end

  def update_tradable
    @ownership.update(tradable: @tradable)
  end


  private

  def increase_ownerships
    (@quantity - @ownership.quantity).times.map do |i|
      Ownership.find_or_create_by(card_id: @card_id, collection_id: @collection_id).add
    end
  end

  def decrease_ownerships
    (@quantity - @ownership.quantity).abs.times.map do |i|
      Ownership.find_or_create_by(card_id: @card_id, collection_id: @collection_id).remove
    end
  end
end
