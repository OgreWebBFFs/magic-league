class DrafflePrize < ApplicationRecord
  belongs_to :draffle
  belongs_to :draffle_participant, optional: true

  def is_picked
    !self.draffle_participant.nil?
  end

end
