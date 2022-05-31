class Match < ApplicationRecord
  scope :played_during_month, ->(date) { where(played_at: date.beginning_of_month..date.end_of_month) }

  has_many :records
  has_many :users, through: :records

  validates :participants, numericality: { greater_than_or_equal_to: 2 }, presence: true
  validates :played_at, presence: true

end
