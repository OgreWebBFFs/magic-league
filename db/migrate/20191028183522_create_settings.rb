class CreateSettings < ActiveRecord::Migration[5.2]
  def up
    # Create table
    create_table :settings do |t|
      t.date :season_start_date, default: -> { 'CURRENT_TIMESTAMP' }, null: false
      t.integer :season_length, default: 365, null: false
      t.integer :trade_allowance_period, default: 1, null: false
      t.integer :bonus_trade_users, array: true, default: [], null: false

      t.timestamps
    end

    # Initialize standard settings page
    Setting.find_or_create_by(id: 1)
  end

  def down
    drop_table :settings
  end
end
