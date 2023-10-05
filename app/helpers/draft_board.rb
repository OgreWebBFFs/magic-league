class DraftSlot
  attr_reader :participant, :pick_num, :user
  attr_accessor :prize

  def initialize participant, prize, pick_num
    @participant = participant
    @user = participant.user
    @prize = prize
    @pick_num = pick_num
  end

end

class DraftBoard
  attr_reader :rounds

  def initialize draffle
    @rounds = Array.new

    round = 0
    while round < draffle.rounds  do
      participants = draffle.draffle_participants.sort_by(&:order)
      if (round + 1).even? && draffle.snake
        participants = participants.reverse
      end
      slots = participants.map.with_index { |participant, i|
        prize = participant.draffle_prizes[round]
        pick_num = round * participants.length + i + 1
        DraftSlot.new participant, prize, pick_num
      }
      @rounds.push slots
      round = round + 1
    end
  end

  def get_slot i
    @rounds.flatten[i]
  end

  def make_selection prize
    slot = self.active_slot
    slot.participant.make_pick prize
    slot.prize = prize
    slot
  end

  def who_is_picking
    self.active_slot.participant.user
  end

  def clear_picks pick
    slots = @rounds.flatten
    slots.slice(pick..slots.length).each do |slot|
      if !slot.prize.nil?
        slot.prize.reset
      end
    end
  end

  def complete?
    @rounds.flatten.none? { |slot| slot.prize.nil? }
  end

  private

  def active_slot
    @rounds.flatten.find{ |slot| slot.prize.nil? }
  end

end