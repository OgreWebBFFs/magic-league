class AddMultiverseIdToCard < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :multiverse_id, :string
  end
end
