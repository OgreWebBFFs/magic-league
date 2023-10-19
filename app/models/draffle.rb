class Draffle < ApplicationRecord
  has_one_attached :draffle_img

  has_many :draffle_participants
  has_many :draffle_prizes

  after_find :build_obj_models
  attr_reader :board

  def start
    if self.status == 'valid'
      OgreBot.instance.draffle_actions.welcome self
    end
    self.update(status: 'processing')
    @img_manager.draw_current_draft_board
    
    self.update(status: 'started')
    OgreBot.instance.draffle_actions.start self
    progress_draft
  end

  def pause
    self.update(status: 'paused')
    Autodraft::Scheduler.clear
    OgreBot.instance.draffle_actions.pause self
  end
  
  def validate
    @board.filled_slots.each do |slot|
      slot.user.add_card slot.prize.card_id
    end
    OgreBot.instance.draffle_actions.complete self
    self.update(status: "completed")
  end

  def reset pick
    @board.clear_picks pick
    if self.pending?
      self.update(status: 'paused')
    end
  end

  def autopick
    prize_num = rand(0...self.available_prizes.length)
    prize = self.available_prizes[prize_num]
    slot = @board.make_selection prize
    OgreBot.instance.draffle_actions.announce_autopick slot.user, slot.prize
    @img_manager.draw_selection slot
    progress_draft
  end

  def pick prize_id
    self.update(status: 'processing')
    prize = self.draffle_prizes.find{ |prize| prize.id == prize_id}
    slot = @board.make_selection prize
    OgreBot.instance.draffle_actions.announce_pick slot.user, slot.prize
    @img_manager.draw_selection slot
    self.update(status: 'started')
    progress_draft
    slot
  end

  def add_participant participant
    DraffleParticipant.create(draffle_id: self.id, user_id: participant["user_id"], order: participant["order"])
  end

  def add_prize prize
    DrafflePrize.create(draffle_id: self.id, card_id: prize["card_id"], name: prize["name"], image: prize["image"], foiled: prize["foiled"])
  end

  def on_the_clock
    if self.running?
      self.board.who_is_picking
    else
      nil
    end
  end

  def available_prizes
    self.draffle_prizes.filter { |prize| prize.available? }.sort_by { |prize| [prize.name, prize.id] }
  end

  def prize_available? prize_id
    self.draffle_prizes.any?{ |prize| prize.id == prize_id && prize.available? }
  end

  def ready?
    self.draffle_participants.length > 0 &&
      self.draffle_prizes.length >= self.draffle_participants.length * self.rounds
  end

  def running?
    self.status == 'started'
  end

  def paused?
    self.status == 'paused'
  end
  
  def pending?
    self.status == 'pending'
  end

  private

  def build_obj_models
    @board = DraftBoard.new self
    @img_manager = DraffleImg.new self
  end

  def progress_draft
    if @board.complete?
      self.update(status: 'pending')
      Autodraft::Scheduler.clear
      OgreBot.instance.draffle_actions.end self
    else
      OgreBot.instance.draffle_actions.notify_next self.on_the_clock
      Autodraft::Scheduler.new
    end
  end

end
