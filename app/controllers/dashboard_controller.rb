class DashboardController < ApplicationController
  def index
    @user = current_user
    @cards = @user.cards.order(:name).group(:id)
  end
end
