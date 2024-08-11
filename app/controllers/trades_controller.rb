class TradesController < ApplicationController
  def index
    trades = Trade.all
    test = TradeSerializer.new(trades)
    render json: test.to_json()
  end

  def create
      invalid_trade_targets = validate_trade(params[:to], params[:from]);
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
        flash[:success] = "Your trade request was sent successfully!"
        review_link = "#{request.base_url}#{user_path params[:to][:id]}#trades"
        OgreBot.instance.trade_alerts.trade_requested new_trade, review_link
        render json: {status: 'success'}
      end
  end

  def update
    trade = Trade.find(params[:id])
    if params[:status] == 'rejected'
      flash[:notice] = "You've successfully declined a trade"
      render json: {status: params[:status]}
      OgreBot.instance.trade_alerts.trade_rejected trade
      trade.update(status: 'rejected')
    elsif params[:status] == 'approved' && trade.status != 'approved'
      to_card_ids = Exchange.where(trade_id: trade.id, user_id: trade.to_user).pluck(:card_id)
      from_card_ids = Exchange.where(trade_id: trade.id, user_id: trade.from_user).pluck(:card_id)

      invalid_trade_targets = validate_trade(
        {:cards => to_card_ids, :id => trade.to_user}, 
        {:cards => from_card_ids, :id => trade.from_user}
      )
      if invalid_trade_targets.length > 0
        trade.update(status: 'error')
        render json: {status: 'error', invalid_trade_targets: invalid_trade_targets }, :status => 400
        flash[:success] = "⚠ Oh No! There was an error processing your trade ⚠"
        OgreBot.instance.trade_alerts.trade_error trade, invalid_trade_targets
      else
        to_user = User.find_by_id(trade.to_user)
        from_user = User.find_by_id(trade.from_user)
        give_cards(from_card_ids, to_user, from_user)
        give_cards(to_card_ids, from_user, to_user);
        flash[:success] = "You've successfully accepted a trade!"
        render json: {status: 'success'}
        OgreBot.instance.trade_alerts.trade_accepted trade
        trade.update(status: 'approved')
      end
    end
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

      is_in_collection = user.cards.count { |card| card.id == cardId } >= amnt_in_trade
      
      if !is_in_collection
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

end
