class ReceivedTrade < ApplicationRecord
  NUM_ALLOWED_BY_RARITY = {
    'rare' => 2,
    'uncommon' => 6,
    'common' => 22,
  }

  belongs_to :user

  validates :rarity, inclusion: { in: NUM_ALLOWED_BY_RARITY.keys, message: "%{value} is not a valid rarity" }
  validates_each :num_received do |record, attr, value|
    record.errors.add(attr, 'too many!') if value > ReceivedTrade::NUM_ALLOWED_BY_RARITY[record.rarity]
    record.errors.add(attr, 'too few!') if value < 0
  end
end
