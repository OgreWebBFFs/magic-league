include PrintsHelper
include Filters

class CardsController < ApplicationController
  def index
    cards = CardsFilter.new.call(Card.all, params).order(:name).sort_by{ |card| 0 - current_user.card_inventory(card.id) }
    if (params[:sets])
      cards += ScryfallService.new(name: params[:name], s: params[:sets]).fetch
    end
    uniq_cards = cards.uniq { |card| card.scryfall_id }
    options = {params: {current_user: current_user}}
    render json: CardSerializer.new(uniq_cards, options).serialized_json
  end
  
  def show
    @card = Card.find_by_id(params[:id])
    @ownerships = @card.ownerships.includes(collection: :user).as_json({
        include: { collection: { include: :user }}
    })
    @message_statuses = @card.message_statuses.where(from_user: current_user)

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

  def scryfall
    res = RestClient.get("https://api.scryfall.com/cards/search?order=name&q=#{params[:q].gsub(" ", "+")}+game:paper")
    puts res
    render json: res
  end
end
