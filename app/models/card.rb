class Card < ApplicationRecord
  has_many :ownerships
  has_many :collections, through: :ownerships 
  has_many :users, -> { distinct },  through: :collections 
  has_many :tradables
  scope :query, ->(string) { where(arel_table[:name].matches("%#{sanitize_sql_like string}%")) }
end
