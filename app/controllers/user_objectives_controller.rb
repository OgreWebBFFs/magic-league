class UserObjectivesController < ApplicationController
  def keep
    user_objective = UserObjective.find(params[:id])
    user_objective.update(keep: !user_objective.keep)
    render json: { status: 'success' }
  end

  def complete
    user_objective = UserObjective.find(params[:id])
    user_objective.complete
    user_objective.reroll
    
    render json: { status: 'success' }
  end
end
