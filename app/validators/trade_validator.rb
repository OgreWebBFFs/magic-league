class TradeValidator < ActiveModel::EachValidator
    def validate_each(record, attribute, value)
        # record.errors.add(attribute, 'is already taken') if User.exists?(email: value)
    end
end