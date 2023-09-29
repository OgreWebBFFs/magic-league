class Draffle < ApplicationRecord
  has_many :draffle_participants
  has_many :draffle_prizes

  def current_pick
    if self.is_running
      self.draffle_participants
        .filter{ |participant| !participant.has_picked(self.current_round) }
        .sort { |a,b| a.order <=> b.order }
        .first
    else
      nil
    end
  end

  def current_round
    self.draffle_participants.map { |participant| participant.picks().length }.min + 1
  end

  def draft_board
    DraftBoard.new self
  end

  def add_participant participant
    DraffleParticipant.create(draffle_id: self.id, user_id: participant["user_id"], order: participant["order"])
  end

  def add_prize prize
    DrafflePrize.create(draffle_id: self.id, card_id: prize["card_id"], name: prize["name"], image: prize["image"], foiled: prize["foiled"])
  end

  def is_ready
    self.draffle_participants.length > 0 &&
      self.draffle_prizes.length >= self.draffle_participants.length * self.rounds
  end

  def is_running
    self.status === 'started'
  end
end
