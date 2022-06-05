class Objective < ApplicationRecord
  has_many :user_objectives
  has_many :users, -> { distinct },  through: :user_objectives
end
