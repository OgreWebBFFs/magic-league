class WishlistsController < ApplicationController
  before_action :set_user, only: [:show, :update]
  def show
    render json: @user.wishlist, status: 200
  end

  def update
    card = current_user.wishlist.where(id: wishlist_params[:card_id])
    if card.count != 0
      current_user.wishes.where(card_id: wishlist_params[:card_id]).destroy_all
    else
      current_user.wishes.create(card_id: wishlist_params[:card_id])
    end
    render json: current_user.wishlist, status: 200
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def wishlist_params
    params.permit(:card_id, :id)
  end
end
