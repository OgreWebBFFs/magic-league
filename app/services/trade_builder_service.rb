class TradeBuilderService 
  def initialize(data)
    @data = deep_copy(data)
  end

  def build
    trade = Trade.create({ status: @data[0][:user] })
    @data.each do |give_entry|
      give_entry[:gives].each do |give_card|

        receive_entry = @data.find{ |entry| entry[:receives].include?(give_card) }

        Exchange.create({
          trade: trade,
          from_user_id: give_entry[:user],
          to_user_id: receive_entry[:user],
          card_id: give_card
        });

        receive_entry[:receives].delete give_card
      end
    end
  end

  private

  def deep_copy(data)
    Marshal.load(Marshal.dump(data))
  end
  
end