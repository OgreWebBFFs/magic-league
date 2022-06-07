class UserObjective < ApplicationRecord
  belongs_to :user
  belongs_to :objective

  validates :user_id, uniqueness: { scope: :objective_id, message: 'A user can only be assigned objective that they are not currently assigned or have not previously completed' }

  def complete
    self.update(completed_at: Time.now)
  end

  def can_be_rerolled
    self.user.has_available_rerolls
  end

  def reroll
    user = self.user
    all_users_objectives = user.user_objectives.pluck(:objective_id)
    new_objective = Objective.where.not(id: all_users_objectives).sample
    UserObjective.create(objective: new_objective, user: user, assigned_at: Time.now)
    if self.completed_at == nil
      user.use_a_reroll
    end
  end
end
