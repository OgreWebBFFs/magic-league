class CreateWikis < ActiveRecord::Migration[6.1]
  def change
    create_table :wikis do |t|
      t.string :title
      t.text :content
      t.string :slug
      t.integer :parent_id

      t.timestamps
    end
  end
end
