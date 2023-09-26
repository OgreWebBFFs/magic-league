class DraffleParticipant < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :draffle

  has_many :draffle_prizes

  def make_pick prize
    prize.update(draffle_participant_id: self.id)
  end

  def picks
    self.draffle_prizes.order(:updated_at)
  end

  def has_picked num_picks
    self.picks().length >= num_picks
  end
end
