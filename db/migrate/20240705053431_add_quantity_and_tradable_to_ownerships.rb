class AddQuantityAndTradableToOwnerships < ActiveRecord::Migration[6.1]
  def change
    add_column :ownerships, :quantity, :integer, default: 0
    add_column :ownerships, :tradable, :boolean, default: nil
  end
end
