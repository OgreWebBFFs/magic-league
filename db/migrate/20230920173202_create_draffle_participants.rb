class CreateDraffleParticipants < ActiveRecord::Migration[6.1]
  def change
    create_table :draffle_participants do |t|
      t.integer :order

      t.belongs_to :user
      t.belongs_to :draffle

      t.timestamps
    end
  end
end
