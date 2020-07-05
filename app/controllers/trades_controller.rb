class TradesController < ApplicationController
  def index

  end

  def create
    card = Card.find(trades_params[:card_id])
    user_id = trades_params[:user_id]
    if (user_id) 
      UserMailer.trade_proposal_email(current_user.id, user_id, card.id).deliver_later
      flash[:success] = "Trade email successfully sent!"
    else
      card.users.select{|a| a.id != current_user.id }.map{|a| a.id}.each do |id|
        UserMailer.trade_proposal_email(current_user.id, id, card.id).deliver_later
      end
      flash[:success] = "Trade emails successfully sent!"
    end
    
    redirect_to request.referer
  end

  private

  def trades_params
    params.require(:trade).permit(:card_id, :user_id)
  end
end

