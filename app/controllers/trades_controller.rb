class TradesController < ApplicationController
  def index
    trades = Trade.all
    test = TradeSerializer.new(trades)
    render json: test.to_json()
  end

  def create
      invalid_trade_targets = [];
      invalid_trade_targets.concat find_invalid_cards(params[:from][:cards], params[:from][:id])
      invalid_trade_targets.concat find_invalid_cards(params[:to][:cards], params[:to][:id])
      if (invalid_trade_targets.length > 0)
        render json: {status: 'error', invalid_trade_targets: invalid_trade_targets }, :status => 400
      else
        new_trade = Trade.create(from_user: params[:from][:id], to_user: params[:to][:id])
        params[:from][:cards].each { |card_id| 
          Exchange.create(card_id: card_id, user_id: params[:from][:id], trade_id: new_trade.id)
        }
        params[:to][:cards].each { |card_id| 

          Exchange.create(card_id: card_id, user_id: params[:to][:id], trade_id: new_trade.id)
        }
        render json: {status: 'success'}
      end
  end

  def update
    Trade.find(params[:id]).update(status: params[:status])
  end

  def destroy
    trade = Trade.find(params[:id])
    Exchange.where(trade_id: trade.id).each { |exchange| 
      exchange.destroy
    }
    trade.destroy
  end

  private

  def find_invalid_cards(card_ids, user_id)
    invalid_cards = []
    card_ids.uniq.each do |cardId|
      is_valid_card = User.where('id = ?', user_id).first.cards.count { |card| card.id == cardId } == card_ids.count { |id| id == cardId }
      if !is_valid_card
        invalid_cards.push Card.where('id = ?', cardId).first.name
      end
    end
    invalid_cards
  end

end
