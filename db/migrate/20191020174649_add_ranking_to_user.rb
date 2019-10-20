class AddRankingToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :ranking, :float
  end
end
