class TradesController < ApplicationController
  def index

  end

  def create
    card = Card.find(trades_params[:card_id])
    card.users.select{|a| a.id != current_user.id }.map{|a| a.id}.each do |id|
      UserMailer.trade_proposal_email(current_user.id, id, card.id).deliver_later
    end
    flash[:success] = "Trade emails successfully sent!"
    redirect_to trades_path
  end

  private

  def trades_params
    params.require(:trade).permit(:card_id)
  end
end

