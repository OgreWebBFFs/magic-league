class Card < ApplicationRecord
  has_many :ownerships
  has_many :collections, through: :ownerships 
  has_many :users, -> { distinct },  through: :collections 
  has_many :tradables
  has_many :wishes
  scope :query_name, ->(string) { where(arel_table[:name].matches("%#{sanitize_sql_like string}%")) }
  scope :query_oracle_text, ->(string) { where(arel_table[:oracle_text].matches("%#{sanitize_sql_like string}%")) }
  scope :query_type_line, ->(string) { where(arel_table[:type_line].matches("%#{sanitize_sql_like string}%")) }
  scope :query_all_text, ->(string) { query_name(string).or(query_oracle_text(string)).or(query_type_line(string)) }

  def received_trades_to_update
    rarity == 'mythic' ? 'rare' : rarity
  end
end
