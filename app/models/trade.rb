class Trade < ApplicationRecord
  belongs_to :from, class_name: 'User', foreign_key: 'from_user'
  belongs_to :to, class_name: 'User', foreign_key: 'to_user'

  has_many :exchanges
  has_many :collections, through: :exchanges
  has_many :ownerships, through: :collections
  has_many :cards, through: :ownerships
  has_many :cards, through: :exchanges

  validates :from, :to, presence: true
  validates :status, acceptance: { accept: ['pending', 'approved', 'rejected']} 
end
