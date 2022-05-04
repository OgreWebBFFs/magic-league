class Exchange < ApplicationRecord
  belongs_to :user
  belongs_to :card
  belongs_to :trade
  
end
