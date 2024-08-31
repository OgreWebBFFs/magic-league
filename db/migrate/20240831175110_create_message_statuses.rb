class CreateMessageStatuses < ActiveRecord::Migration[6.1]
  def change
    create_table :message_statuses do |t|
      t.references :from_user, null: false, foreign_key:  { to_table: :users }
      t.references :to_user, null: false, foreign_key:  { to_table: :users }
      t.references :card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
