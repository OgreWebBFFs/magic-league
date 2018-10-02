class OwnershipManager
  def initialize(params)
    @ownerships = Ownership.from_params(params)
    @card_id = params[:card_id]
    @collection_id = params[:collection_id]
    @count = params[:count].to_i
  end

  def update_ownerships
    @count > @ownerships.count ? increase_ownerships : decrease_ownerships 
  end


  private

  def increase_ownerships
    (@count - @ownerships.count).times.map do |i|
      Ownership.new(card_id: @card_id, collection_id: @collection_id).save
    end
  end

  def decrease_ownerships
    (@count - @ownerships.count).abs.times.map do |i|
      @ownerships.last.destroy
    end
  end
end
