class AddDiscordThreadIdToDraffle < ActiveRecord::Migration[6.1]
  def change
    add_column :draffles, :discord_thread_id, :bigint
  end
end
