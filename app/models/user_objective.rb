class UserObjective < ApplicationRecord
  belongs_to :user
  belongs_to :objective

  validates :user_id, uniqueness: { scope: :objective_id, message: 'A user can only be assigned objective that they are not currently assigned or have not previously completed' }

  def complete
    self.update(completed_at: Time.now)
  end

  def reroll
    user = self.user
    all_users_objectives = user.user_objectives.pluck(:objective_id)
    new_objective = Objective.where.not(id: all_users_objectives).sample
    UserObjective.create(objective: new_objective, user: user, assigned_at: Time.now)
  end
end
