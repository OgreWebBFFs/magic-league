class DropTradables < ActiveRecord::Migration[6.1]
    def up
        drop_table :tradables
    end

    def down
        create_table :tradables do |t|
            t.belongs_to :card, index: true
            t.belongs_to :user, index: true
      
            t.timestamps
        end
    end
end
