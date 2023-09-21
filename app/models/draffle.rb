class Draffle < ApplicationRecord
  has_many :draffle_participants
  has_many :draffle_prizes
end
