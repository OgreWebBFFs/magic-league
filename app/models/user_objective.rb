class UserObjective < ApplicationRecord
  belongs_to :user
  belongs_to :objective

  validates :user_id, uniqueness: { scope: :objective_id, message: 'A user can only be assigned objective that they are not currently assigned or have not previously completed' }
end
