class TradeMessageController < ApplicationController
  def index

  end

  def create
    card = Card.find(trades_params[:card_id])
    to_user  = User.where(id: trades_params[:to_user_id]).first
    from_user = User.where(id: trades_params[:from_user_id]).first
    wishlist_cards = Wish.where(user_id: to_user).where(card_id: from_user.cards).map(&:card)

    if (to_user.discord_id.nil?)
      flash[:error] = "Message could not be sent. User has not linked their discord"
      redirect_to request.referer
    else
      # OgreBot.instance.trade_request.ask_about_card(to_user, from_user, card, wishlist_cards)
      MessageStatus.find_or_create_by(from_user: from_user, to_user: to_user, card: card).touch
      render json: {}, status: :ok
    end
    
  end

  private

  def trades_params
    params.permit(:card_id, :to_user_id, :from_user_id, :custom_message)
  end
end

