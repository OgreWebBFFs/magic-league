class CreateDraffles < ActiveRecord::Migration[6.1]
  def change
    create_table :draffles do |t|
      t.string :name, default: 'New Draffle'
      t.string :status, default: 'created'
      t.integer :rounds, default: 1
      t.boolean :snake, default: false
      
      t.timestamps
    end
  end
end
