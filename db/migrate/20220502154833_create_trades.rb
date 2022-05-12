class CreateTrades < ActiveRecord::Migration[5.2]
  def change
    create_table :trades do |t|
      t.integer :from_user
      t.integer :to_user
      t.string :status, default: 'pending'

      t.timestamps
    end
  end
end
