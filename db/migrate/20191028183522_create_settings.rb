class CreateSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :settings do |t|
      t.date :season_start_date, default: -> { 'CURRENT_TIMESTAMP' }, null: false
      t.integer :season_length, default: 365, null: false
      t.integer :trade_allowance_period, default: 1, null: false
      t.integer :bonus_trade_users, array: true, default: [], null: false

      t.timestamps
    end
  end
end
