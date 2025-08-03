class UpdateCardsTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :cards, :multiverse_id, :integer
    add_column :cards, :scryfall_id, :string
  end
end
