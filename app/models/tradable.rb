class Tradable < ApplicationRecord
  belongs_to :user
  belongs_to :card
  validates :user_id, uniqueness: { scope: :card_id }
end
