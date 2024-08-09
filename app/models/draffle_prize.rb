class DrafflePrize < ApplicationRecord
  belongs_to :draffle
  belongs_to :draffle_participant, optional: true

  def reset
    self.update(draffle_participant: nil)
  end

  def available?
    self.draffle_participant.nil?
  end

end
