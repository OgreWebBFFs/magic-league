class Draffle < ApplicationRecord
  has_many :draffle_participants
  has_many :draffle_prizes

  after_find :build_obj_models

  def start
    @img.new_card_grid
    
    i = 0
    slot = @board.get_slot(i)
    while !slot.prize.nil? do
      @img.update_with_selection slot
      i = i + 1
      slot = @board.get_slot(i)
    end

    self.update(status: 'started')
  end

  def reset pick
    @board.clear_picks pick
  end

  def pick prize_id
    prize = self.draffle_prizes.find{ |prize| prize.id == prize_id}
    slot = @board.make_selection prize
    @img.update_with_selection slot
    slot
  end

  def draft_board
    @board
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

  private

  def build_obj_models
    @board = DraftBoard.new self
    @img = DraffleImg.new self
  end

end
