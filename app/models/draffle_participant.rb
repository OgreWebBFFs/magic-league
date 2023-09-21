class DraffleParticipant < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :draffle

  has_many :draffle_prizes
end
