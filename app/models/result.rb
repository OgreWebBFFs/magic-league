class Result < ApplicationRecord
  
  belongs_to :match, class_name: 'Match', foreign_key: 'match_id'
  belongs_to :user, class_name: 'User', foreign_key: 'user_id'

  validates :place, numericality: { 
    greater_than: 0,
    less_than_or_equal_to: ->(result) {result.match.participants}
  }
end
