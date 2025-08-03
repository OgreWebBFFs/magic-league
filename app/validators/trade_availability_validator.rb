class TradeAvailabilityValidator < ActiveModel::Validator
    def validate(record)
        trade_data = record.data
        return if trade_data.blank?

        trade_data.each { |entry|
            user = User.find_by_id entry[:user]
            entry[:receives].uniq.each { |card_id|
              card_to_check = Card.find_by_id card_id
              
              if card_to_check.rarity != 'common'
                amnt_in_trade = entry[:receives].count { |id| id == card_id }
                rarity_to_check = card_to_check.received_trades_to_update
                has_sufficient_trade_slots = user.available_trades_for_rarity(rarity_to_check) - amnt_in_trade >= 0

                if !has_sufficient_trade_slots
                    record.errors.add(:base, "#{user.name} has insufficient #{rarity_to_check} trades")
                end
              end
            }
        }
    end
end