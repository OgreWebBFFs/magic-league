class TradeInventoryValidator < ActiveModel::Validator
    def validate(record)
        trade_data = record.data
        return if trade_data.blank?

        trade_data.each { |entry|
            user = User.find_by_id entry[:user]
            entry[:gives].uniq.each { |card_id|
                card_to_check = Card.find_by_id card_id
                amnt_in_trade = entry[:gives].count { |id| id == card_id }
        
                has_sufficient_inventory = user.card_inventory(card_id) >= amnt_in_trade
                if !has_sufficient_inventory
                    record.errors.add(:base, "#{user.name} has insufficient inventory: #{card_to_check.name}")
                end
            }
        }
    end
end