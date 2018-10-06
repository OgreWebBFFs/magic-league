class CreateWishes < ActiveRecord::Migration[5.2]
  def change
    create_table :wishes do |t|
      t.belongs_to :user, index: true
      t.belongs_to :card, index: true

      t.timestamps
    end
  end
end
