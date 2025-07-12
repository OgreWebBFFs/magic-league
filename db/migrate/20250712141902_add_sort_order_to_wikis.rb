class AddSortOrderToWikis < ActiveRecord::Migration[6.1]
  def change
    add_column :wikis, :sort_order, :integer
  end
end
