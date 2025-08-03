class AddHiddenToWikis < ActiveRecord::Migration[6.1]
  def change
    add_column :wikis, :hidden, :boolean
  end
end
