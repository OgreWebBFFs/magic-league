class TradesController < ApplicationController
  def index
    trades = Trade.all
    test = TradeSerializer.new(trades)
    render json: test.to_json()
  end
end
