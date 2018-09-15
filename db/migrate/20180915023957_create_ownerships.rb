class CreateOwnerships < ActiveRecord::Migration[5.2]
  def change
    create_table :ownerships do |t|
      t.belongs_to :collection, index: true
      t.belongs_to :card, index: true
      t.timestamps
    end
  end
end
