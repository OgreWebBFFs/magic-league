class CreateExchanges < ActiveRecord::Migration[5.2]
  def change
    create_table :exchanges do |t|
      t.belongs_to :card
      t.belongs_to :user
      t.belongs_to :trade

      t.timestamps
    end
  end
end
