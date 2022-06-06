class CreateUserObjectives < ActiveRecord::Migration[5.2]
  def change
    create_table :user_objectives do |t|
      t.belongs_to :user, foreign_key: true
      t.references :objective, foreign_key: true
      t.boolean :keep, default: false
      t.datetime :assigned_at
      t.datetime :completed_at
    end
  end
end
