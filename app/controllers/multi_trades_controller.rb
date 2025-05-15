class MultiTradesController < ApplicationController
    def index
      trades = Trade.all
      test = TradeSerializer.new(trades)
      render json: test.to_json()
    end
  
    def create
        trade_form = TradeForm.new(data: trade_params).save
        if trade_form.valid?
          flash[:success] = "Your trade request was sent successfully!"
          trade_form.result.request
        end
        render json: {status: trade_form.valid? ? 'success' : 'error', errors: trade_form.errors}, :status => trade_form.valid? ? 200 : 400;
    end
  
    def update
        trade = Trade.find_by(id: params[:id])
        
        if params[:status] == 'rejected'
          flash[:notice] = "You've successfully declined a trade"
          trade.reject
        elsif params[:status] == 'approved'
          flash[:success] = "You've successfully accepted a trade!"
          trade.approve params[:user_id]
        end
        render json: {status: 'updated'}
    end
  
    def destroy
      trade = Trade.find(params[:id])
      Exchange.where(trade_id: trade.id).each { |exchange| 
        exchange.destroy
      }
      trade.destroy
    end
  
    private

    def trade_params
        params.require(:data).map do |entry| 
            entry.permit(:user, gives: [], receives: [])
        end
    end
end
  