class TradeBalanceValidator < ActiveModel::Validator
    def validate(record)
        trade_data = record.data
        return if trade_data.blank?
        puts trade_data
        gives = trade_data.flat_map { |entry| entry[:gives] }.sort
        receives = trade_data.flat_map { |entry| entry[:receives] }.sort

        if gives != receives
            record.errors.add(:base, "Cards given and received must match exactly")
        end
    end
end