class RemoveFromUserAndToUserFromTrades < ActiveRecord::Migration[6.1]
  def change
    remove_column :trades, :from_user, :integer
    remove_column :trades, :to_user, :integer
  end
end