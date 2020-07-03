class Card < ApplicationRecord
  has_many :ownerships
  has_many :collections, through: :ownerships 
  has_many :users, -> { distinct },  through: :collections 
  has_many :tradables
  has_many :wishes
  scope :query, ->(string) { where(arel_table[:name].matches("%#{sanitize_sql_like string}%")) }
end
