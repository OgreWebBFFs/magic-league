class TradesController < ApplicationController
  def index
    trades = Trade.all
    render json: trades.to_json(
      :include => {
        :from => {only: [:name, :id]},
        :to => {only: [:name, :id]}
      })
  end
end
