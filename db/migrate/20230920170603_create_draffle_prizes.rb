class CreateDrafflePrizes < ActiveRecord::Migration[6.1]
  def change
    create_table :draffle_prizes do |t|
      t.string :name
      t.string :image
      t.string :card_id
      t.boolean :foiled

      t.belongs_to :draffle, foreign_key: true
      t.belongs_to :draffle_participant
      t.timestamps
    end
  end
end
