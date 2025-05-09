class TradeForm
    include ActiveModel::Model
    include ActiveModel::Validations

    attr_accessor :data
    
    validates_with TradeBalanceValidator
    validates_with TradeInventoryValidator
    validates_with TradeAvailabilityValidator

    def save
       return self unless valid?
       TradeBuilderService.new(data).build
       self
    end
end