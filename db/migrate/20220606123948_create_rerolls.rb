class CreateRerolls < ActiveRecord::Migration[5.2]
  def change
    create_table :rerolls do |t|
      t.belongs_to :user
      t.integer :used, default: 0
      t.integer :allowed, default: 1

      t.timestamps
    end
  end
end
