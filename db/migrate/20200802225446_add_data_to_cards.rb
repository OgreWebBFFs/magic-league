class AddDataToCards < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :oracle_text, :string
    add_column :cards, :type_line, :string
    add_column :cards, :mana_cost, :string
    add_column :cards, :cmc, :decimal
    add_column :cards, :colors, :string, array: true, default: []
    add_column :cards, :rarity, :string
  end
end
