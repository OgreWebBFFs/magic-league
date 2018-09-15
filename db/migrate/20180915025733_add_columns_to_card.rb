class AddColumnsToCard < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :description, :string
    add_column :cards, :set, :string
    add_column :cards, :image_url, :string
  end
end
