class CreateDraffles < ActiveRecord::Migration[6.1]
  def change
    create_table :draffles do |t|
      t.string :name, default: 'New Draffle'
      t.string :status, default: 'created'

      t.timestamps
    end
  end
end
