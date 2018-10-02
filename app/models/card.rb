class Card < ApplicationRecord
  scope :query, ->(string) { where(arel_table[:name].matches("%#{string}%")) }
end
