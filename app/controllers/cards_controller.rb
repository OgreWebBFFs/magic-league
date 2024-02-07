include PrintsHelper

class CardsController < ApplicationController
  def index
    cards = Card.query_all_text(params[:query]).order(:name)
    options = {params: {current_user: current_user}}
    render json: CardSerializer.new(cards, options).serialized_json
  end
  
  def show
    @card = Card.find_by_id(params[:id])
    
    counts_by_id = Hash.new
    @card.ownerships.each do |o|
      counts_by_id[o.collection.user.id] ||= 0
      counts_by_id[o.collection.user.id] += 1
    end
    @owner_details = Hash.new
    @card.ownerships.sort_by{ |o| o.collection.user.name }.each do |o|
      user = o.collection.user
      @owner_details[user.id] = {id: user.id, name: user.name, count: counts_by_id[user.id] }
    end

    @wishlisters_details = Hash.new
    @card.wishes.sort_by{ |w| w.user.name }.each do |w|
      user = w.user
      @wishlisters_details[user.id] = { id: user.id, name: user.name, count: counts_by_id[user.id] ? counts_by_id[user.id] : 0 }
    end
  end

  def prints
    card = Card.find_by_id(params[:id])
    render json: get_card_prints(card)
  end
end
