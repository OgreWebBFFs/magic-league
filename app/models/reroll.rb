class Reroll < ApplicationRecord
  belongs_to :user

  validates :used, numericality: {
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: ->(reroll) {reroll.allowed},
    message: 'cannot use more rerolls than allowed'
  }
  validates :user_id, uniqueness: true
end
