class Draffle < ApplicationRecord
  has_many :draffle_participants
  has_many :draffle_prizes

  after_find :build_obj_models
  attr_reader :board

  def start
    initialize_img
    if self.status == 'valid'
      OgreBot.instance.draffle_actions.welcome
    end

    self.update(status: 'started')
    OgreBot.instance.draffle_actions.start self
    progress_draft
  end

  def pause
    self.update(status: 'paused')
    Autodraft::Scheduler.clear
    OgreBot.instance.draffle_actions.pause self
  end

  def reset pick
    @board.clear_picks pick
    if self.pending?
      self.update(status: 'paused')
    end
  end

  def autopick
    # Need to re-initialize image here since autodrafter runs in a separate heroku dyno
    initialize_img 
    prize_num = rand(0...self.available_prizes.length)
    prize = self.available_prizes[prize_num]
    pick_info = pick_prize prize
    OgreBot.instance.draffle_actions.announce_autopick pick_info.user, pick_info.prize
    progress_draft
  end

  def pick prize_id
    prize = self.draffle_prizes.find{ |prize| prize.id == prize_id}
    pick_info = pick_prize prize
    OgreBot.instance.draffle_actions.announce_pick pick_info.user, pick_info.prize
    progress_draft
    pick_info
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
    self.draffle_prizes.filter { |prize| prize.available? }.sort_by(&:id)
  end

  def prize_available? prize_id
    self.draffle_prizes.any?{ |prize| prize.id === prize_id && prize.available? }
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
    @img = DraffleImg.new self
  end

  def initialize_img
    @img.new_card_grid

    i = 0
    slot = @board.get_slot(i)
    while !slot.prize.nil? do
      @img.update_with_selection slot
      i = i + 1
      slot = @board.get_slot(i)
    end
  end

  def pick_prize prize
    slot = @board.make_selection prize
    @img.update_with_selection slot
    slot
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
