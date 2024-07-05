class OwnershipManager
  def initialize(params)
    @card_id = params[:card_id]
    @collection_id = params[:collection_id]
    @count = params[:count].to_i
    @ownership = Ownership.find_or_create_by(card_id: @card_id, collection_id: @collection_id)
  end

  def update_ownerships
    if @count == 0
        @ownership.destroy
        0
    else
        @ownership.update(quantity: @count)
        @ownership.quantity
    end
  end


  private

  def increase_ownerships
    (@count - @ownership.quantity).times.map do |i|
      Ownership.find_or_create_by(card_id: @card_id, collection_id: @collection_id).add
    end
  end

  def decrease_ownerships
    (@count - @ownership.quantity).abs.times.map do |i|
      Ownership.find_or_create_by(card_id: @card_id, collection_id: @collection_id).remove
    end
  end
end
