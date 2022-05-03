class Exchange < ApplicationRecord
  belongs_to :collection
  belongs_to :card
  belongs_to :trade
  
end
