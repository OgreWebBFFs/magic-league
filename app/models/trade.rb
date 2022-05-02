class Trade < ApplicationRecord
  belongs_to :from, class_name: 'User', foreign_key: 'from_user'
  belongs_to :to, class_name: 'User', foreign_key: 'to_user'

  validates :from, :to, presence: true
end
