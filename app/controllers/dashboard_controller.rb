class DashboardController < ApplicationController
    def index
      @cards = current_user.cards.order(:name).group(:id)
      @count = @cards.count
      @user = current_user
    end
  end
