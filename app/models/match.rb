class Match < ApplicationRecord
  scope :played_during_month, ->(date) { where(played_at: date.beginning_of_month..date.end_of_month) }

  has_many :results
  has_many :users, through: :results

  validates :participants, numericality: { greater_than_or_equal_to: 2 }, presence: true
  validates :played_at, presence: true

  def get_user_in_place(place)
    Result.where('match_id = ? AND place = ?', id, place).first.user
  end

  def users_in_match
    Result.where('match_id = ?', id).map{ |result| result.user }
  end

end
