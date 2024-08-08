include PrintsHelper
include Filters

class CardsController < ApplicationController
  def index
    cards = CardsFilter.new.call(Card.all, params).order(:name)
    options = {params: {current_user: current_user}}
    render json: CardSerializer.new(cards, options).serialized_json
  end
  
  def show
    @card = Card.find_by_id(params[:id])
    @ownerships = @card.ownerships.includes(collection: :user).as_json({
        include: { collection: { include: :user }}
    })

    @wishlisters_details = Hash.new
    @card.wishes.sort_by{ |w| w.user.name }.each do |w|
      user = w.user
      ownership = user.collection.ownerships.find_by(card: @card)
      count = ownership.present? ? ownership.quantity : 0
      @wishlisters_details[user.id] = { id: user.id, name: user.name, count: count }
    end
  end

  def prints
    card = Card.find_by_id(params[:id])
    render json: get_card_prints(card)
  end
end
