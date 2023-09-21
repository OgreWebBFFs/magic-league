class DrafflePrize < ApplicationRecord
  belongs_to :draffle
  belongs_to :draffle_participant, optional: true
end
