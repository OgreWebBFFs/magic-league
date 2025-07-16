class TradeForm
    include ActiveModel::Model
    include ActiveModel::Validations

    attr_accessor :data
    attr_accessor :result
    
    validates_with TradeBalanceValidator
    validates_with TradeInventoryValidator
    validates_with TradeAvailabilityValidator

    def save
      return self unless valid?
      @result = TradeBuilderService.new(data).build
      self
    end
end