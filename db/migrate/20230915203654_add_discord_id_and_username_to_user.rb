class AddDiscordIdAndUsernameToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :discord_id, :string
    add_column :users, :discord_username, :string
  end
end
