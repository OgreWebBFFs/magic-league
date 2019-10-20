class ReceivedTrade < ApplicationRecord
  NUM_PER_PACK_BY_RARITY = {
    'rare' => 1,
    'uncommon' => 3,
  }

  belongs_to :user

  validates :rarity, inclusion: { in: NUM_PER_PACK_BY_RARITY.keys, message: "%{value} is not a valid rarity" }
  validates_each :num_received do |record, attr, value|
    record.errors.add(attr, 'too many!') if value > num_allowed(record.rarity, record.user.name)
    record.errors.add(attr, 'too few!') if value < 0
  end

  def self.num_allowed(rarity, user_name)
    NUM_PER_PACK_BY_RARITY[rarity] * (num_trade_sets + extra_trade_sets(user_name))
  end

  private

  def self.num_trade_sets
    1
  end

  def self.extra_trade_sets(user_name)
    0
  end
end
