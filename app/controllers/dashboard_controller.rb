class DashboardController < ApplicationController
  def index
    @user = current_user
    @cards = @user.cards.order(:name).group(:id)
    @count = @cards.count
    @tradables = @user.tradables
    @wishlist = @user.wishlist
  end
end
