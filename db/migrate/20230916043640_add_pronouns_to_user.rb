class AddPronounsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :pronouns, :string
  end
end
