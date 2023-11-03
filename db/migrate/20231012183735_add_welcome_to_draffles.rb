class AddWelcomeToDraffles < ActiveRecord::Migration[6.1]
  def change
    add_column :draffles, :welcome, :text, default: "Welcome to a New Draffle!"
  end
end
