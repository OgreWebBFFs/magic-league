class MultiTradesController < ApplicationController
    def index
      trades = Trade.all
      test = TradeSerializer.new(trades)
      render json: test.to_json()
    end
  
    def create
        trade_form = TradeForm.new(data: trade_params).save
        render json: {status: trade_form.valid?, errors: trade_form.errors}
    end
  
    def update
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
  
    def give_cards(card_ids, receive_user, give_user)
      card_ids.each { |card_id| 
        card = Card.find_by_id(card_id)
        if card.received_trades_to_update != 'common'
          tracked_trade = receive_user.received_trades.find_or_initialize_by(rarity: card.received_trades_to_update)
          tracked_trade.increment
        end
        receive_user.add_card card
        give_user.remove_card card
      }
    end
  
    def validate_trade(to, from)
      invalid_cards = []
      invalid_cards.concat find_invalid_inventory(from[:cards], from[:id])
      invalid_cards.concat find_invalid_inventory(to[:cards], to[:id])
      invalid_cards.concat find_invalid_rarities(to[:cards], from[:id])
      invalid_cards.concat find_invalid_rarities(from[:cards], to[:id])
      invalid_cards
    end
  
    def find_invalid_inventory(card_ids, user_id)
      user = User.find_by_id(user_id)
      invalid_cards = []
      card_ids.uniq.each do |cardId|
        card_to_check = Card.find_by_id(cardId)
        amnt_in_trade = card_ids.count { |id| id == cardId }
  
        has_sufficient_inventory = user.card_inventory(cardId) >= amnt_in_trade
        
        if !has_sufficient_inventory
          invalid_cards.push({:card => card_to_check.name, :player => user.name, :reason => "insufficient inventory"})
        end    
      end
      invalid_cards
    end
  
    def find_invalid_rarities(card_ids, user_id)
      user = User.find_by_id(user_id)
      invalid_cards = []
      available_trades = {
        :common => 1.0 / 0,# this represents Infinity
        :uncommon => user.available_trades_for_rarity('uncommon'),
        :rare => user.available_trades_for_rarity('rare'),
      }
      card_ids.uniq.each do |cardId|
        card_to_check = Card.find_by_id(cardId)
        rarity_to_check = card_to_check.received_trades_to_update.to_sym
        amnt_in_trade = card_ids.count { |id| id == cardId }
  
        available_trades.update({rarity_to_check => available_trades[rarity_to_check] - amnt_in_trade})
  
        if available_trades[rarity_to_check] < 0
          invalid_cards.push({:card => card_to_check.name, :player => user.name, :reason => "insufficient #{rarity_to_check.to_s} trades"})
        end
      end
      invalid_cards
    end
  
    def trade_params
        params.require(:data).map do |entry| 
            entry.permit(:user, gives: [], receives: [])
        end
    end
end
  