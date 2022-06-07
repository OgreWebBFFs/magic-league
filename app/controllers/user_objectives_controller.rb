class UserObjectivesController < ApplicationController

  def create
    Objective.all.sample(3).each { |objective| UserObjective.create(user_id: params[:user_id], objective: objective, assigned_at: Time.now) }
    render json: { status: 'success' }
  end

  def reroll
    user_objective = UserObjective.find(params[:id])
    can_reroll = user_objective.can_be_rerolled
    if (can_reroll)
      user_objective.reroll
      user_objective.unassign
      render json: { status: 'success' }
    else
      render json: { status: 'error', message: 'No rerolls available' }, status: 400
    end
  end

  def complete
    user_objective = UserObjective.find(params[:id])
    user_objective.complete
    user_objective.reroll
    
    render json: { status: 'success' }
  end
end
