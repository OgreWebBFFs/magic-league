class RemoveRankingFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :user, :ranking, :float
  end
end
