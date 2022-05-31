class Result < ApplicationRecord
  
  belongs_to :match, class_name: 'Match', foreign_key: 'match_id'
  has_one :user

  validates :place, numericality: { 
    greater_than: 0,
    less_than_or_equal_to: ->(result) {result.match.participants}
  }
end
