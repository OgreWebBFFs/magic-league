class CreateTradables < ActiveRecord::Migration[5.2]
  def change
    create_table :tradables do |t|
      t.belongs_to :card, index: true
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
