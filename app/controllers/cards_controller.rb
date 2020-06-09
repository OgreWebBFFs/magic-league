class CardsController < ApplicationController
  def index
    cards = Card.query(params[:query]).order(:name)
    options = {params: {current_user: current_user}}
    respond_to do |format|
      format.js { render json: CardSerializer.new(cards, options).serialized_json }
    end
  end
  
  def show
    @card = Card.find_by_id(params[:id])
    @total_count = @card.ownerships.count
    counts_by_id = Hash.new
    @card.ownerships.each do |o|
      counts_by_id[o.collection.user.id] ||= 0
      counts_by_id[o.collection.user.id] += 1
    end
    @owner_details = Hash.new
    @card.ownerships.each do |o|
      user = o.collection.user
      @owner_details[user.id] = {id: user.id, name: user.name, count: counts_by_id[user.id] }
    end
  end
end
