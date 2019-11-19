class RemoveRankingFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :ranking, :float
  end
end
