class RenameTradeAllowancePeriodToBaseTradeSets < ActiveRecord::Migration[5.2]
  def change
    rename_column :settings, :trade_allowance_period, :base_trade_sets
  end
end
