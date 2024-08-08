class TradeMessageController < ApplicationController
  def index

  end

  def create
    card = Card.find(trades_params[:card_id])
    to_user  = User.where(id: trades_params[:to_user_id]).first
    from_user = User.where(id: trades_params[:from_user_id]).first
    OgreBot.instance.trade_request.ask_about_card(to_user, from_user, card)
    # if (user_id) 
    #   UserMailer.trade_proposal_email(current_user.id, user_id, card.id).deliver_later
    #   flash[:success] = "Trade email successfully sent!"
    # else
    #   card.users.select{|a| a.id != current_user.id }.map{|a| a.id}.each do |id|
    #     UserMailer.trade_proposal_email(current_user.id, id, card.id).deliver_later
    #   end
    # end
    flash[:success] = "Your message has been successfully sent!"
    
    redirect_to request.referer
  end

  private

  def trades_params
    params.permit(:card_id, :to_user_id, :from_user_id, :custom_message)
  end
end

