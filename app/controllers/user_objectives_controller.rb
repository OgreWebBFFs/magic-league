class UserObjectivesController < ApplicationController
  def keep
    user_objective = UserObjective.find(params[:id])
    user_objective.update(keep: !user_objective.keep)
    render json: { status: 'success' }
  end
end
