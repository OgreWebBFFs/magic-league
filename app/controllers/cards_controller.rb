include PrintsHelper
include Filters

class CardsController < ApplicationController
  def index
    cards = CardsFilter.new.call(Card.all, params).order(:name).sort_by{ |card| 0 - current_user.card_inventory(card.id) }
    if (params[:scryfall])
      cards += ScryfallService.new(q: params[:scryfall]).fetch
    end
    uniq_cards = cards.uniq { |card| card.scryfall_id }
    options = {params: {current_user: current_user}}
    render json: CardSerializer.new(uniq_cards, options).serialized_json
  end
  
  def show
    @card = Card.find_by_id(params[:id])
    @variants = @card.variants
    @grid = OwnershipGridPresenter.new(@card, current_user);
    @wishlist_grid = WishlistGridPresenter.new(@card)
  end

  def prints
    card = Card.find_by_id(params[:id])
    render json: get_card_prints(card)
  end
end
