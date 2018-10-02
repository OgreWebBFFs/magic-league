class Card < ApplicationRecord
  scope :query, ->(string) { where(arel_table[:name].matches("%#{sanitize_sql_like string}%")) }
end
