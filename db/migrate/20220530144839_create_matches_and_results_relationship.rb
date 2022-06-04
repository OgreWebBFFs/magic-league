class CreateMatchesAndResultsRelationship < ActiveRecord::Migration[5.2]
  def up
    create_table :results do |t|
      t.belongs_to :match
      t.integer    :user_id
      t.integer    :place 
    end

    execute <<-SQL
      INSERT INTO Results (match_id, user_id, place)
        SELECT id, winner_id, 1
        FROM Matches;
      INSERT INTO Results (match_id, user_id, place)
        SELECT id, loser_id, 2
        FROM Matches;
    SQL

    add_column :matches, :participants, :integer
    Match.reset_column_information
    Match.update_all(participants: 2)
  end

  def down
    remove_column :matches, :participants

    drop_table :results
  end
end
