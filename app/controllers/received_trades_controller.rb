class ReceivedTradesController < ApplicationController
  before_action :set_user, only: [:create]
  def create
    trade = @user.received_trades.find_or_initialize_by(rarity: params[:rarity])
    fallback_value = trade.num_received ? trade.num_received : 0
    if trade.update(num_received: params[:num_received])
      render json: { success: 'true' }, status: 200
    else
      render json: { success: 'false', fallback_value: fallback_value }, status: 200
    end
  end

  private
  def set_user
    @user = User.find(params[:user_id])
  end
end
