class CardsController < ApplicationController
  def index
    @cards = Card.query(params[:query]).order(:name)
    respond_to do |format|
      format.js { render json: @cards }
    end
  end
end
