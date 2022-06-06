class UserObjectivesController < ApplicationController
  def keep
    user_objective = UserObjective.find(params[:id])
    user_objective.update(keep: !user_objective.keep)
    render json: { status: 'success' }
  end

  def complete
    user_objective = UserObjective.find(params[:id])
    user_objective.update(completed_at: Time.now)
    all_users_objectives = user_objective.user.user_objectives.pluck(:objective_id)
    new_objective = Objective.where.not(id: all_users_objectives).sample
    UserObjective.create(objective: new_objective, user: user_objective.user, assigned_at: Time.now)
    render json: { status: 'success' }
  end
end
