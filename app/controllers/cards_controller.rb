class CardsController < ApplicationController
  def index
    cards = Card.query(params[:query]).order(:name)
    options = {params: {current_user: current_user}}
    respond_to do |format|
      format.js { render json: CardSerializer.new(cards, options).serialized_json }
    end
  end
  
  def show
  end
end
