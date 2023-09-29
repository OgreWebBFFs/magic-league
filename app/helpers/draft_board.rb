class DraftSlot
  def initialize participant, prize
    @user = participant.user
    @prize = prize
  end
end

class DraftBoard
  def initialize draffle
    @rounds = Array.new

    round = 1
    while round <= draffle.rounds  do
      participants = draffle.draffle_participants.sort_by(&:order)
      if round.even? && draffle.snake
        participants = participants.reverse
      end
      slots = participants.map { |participant|
        prize = participant.draffle_prizes[round - 1]
        DraftSlot.new participant, prize
      }
      @rounds.push slots
      round = round + 1
    end
  end
end