class CreateReceivedTrades < ActiveRecord::Migration[5.2]
  def change
    create_table :received_trades do |t|
      t.belongs_to :user, foreign_key: true
      t.string :rarity
      t.integer :num_received

      t.timestamps
    end
  end
end
