class UpdateExchangesForUserDirection < ActiveRecord::Migration[6.1]
  def change
    remove_reference :exchanges, :user

    add_reference :exchanges, :from_user, foreign_key: { to_table: :users }
    add_reference :exchanges, :to_user, foreign_key: { to_table: :users }
  end
end