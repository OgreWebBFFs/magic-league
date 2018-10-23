class Match < ApplicationRecord
  belongs_to :winner, class_name: 'User', foreign_key: 'winner_id'
  belongs_to :loser, class_name: 'User', foreign_key: 'loser_id'

  validates :winner, :loser, :played_at, presence: true

end
