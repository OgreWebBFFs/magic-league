class AddPlayedAtToMatch < ActiveRecord::Migration[5.2]
  def change
    add_column :matches, :played_at, :datetime
  end
end
