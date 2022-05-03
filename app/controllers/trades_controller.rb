class TradesController < ApplicationController
  def index
    trades = Trade.all
    test = TradeSerializer.new(trades)
    render json: test.to_json()
  end

  def create
      new_trade = Trade.create(from_user: params[:from][:id], to_user: params[:to][:id])
      params[:from][:cards].each { |card_id| 
        Exchange.create(card_id: card_id, collection_id: params[:from][:collection], trade_id: new_trade.id)
      }
      params[:to][:cards].each { |card_id| 
        Exchange.create(card_id: card_id, collection_id: params[:to][:collection], trade_id: new_trade.id)
      }
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
end
