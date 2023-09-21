class Draffle < ApplicationRecord
  has_many :draffle_participants
  has_many :draffle_prizes

  def add_participant participant
    DraffleParticipant.create(draffle_id: self.id, user_id: participant["user_id"], order: participant["order"])
  end

  def add_prize prize
    DrafflePrize.create(draffle_id: self.id, card_id: prize["card_id"], name: prize["name"], image: prize["image"], foiled: prize["foiled"])
  end

  def is_ready
    self.draffle_participants.length > 0 &&
      self.draffle_prizes.length >= self.draffle_participants.length
  end
end
