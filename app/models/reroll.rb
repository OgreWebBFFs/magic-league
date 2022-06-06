class Reroll < ApplicationRecord
  belongs_to :user

  validates :used, numericality: {
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: ->(reroll) {reroll.allowed},
    message: 'cannot use more rerolls than allowed'
  }
  validates :user_id, uniqueness: true

  def can_roll
    self.used < self.allowed && self.user.unkept_objectives.length > 0
  end

  def roll
    self.user.reroll_objectives
  end
end
