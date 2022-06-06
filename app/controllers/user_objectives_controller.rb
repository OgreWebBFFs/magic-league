class UserObjectivesController < ApplicationController

  def create
    Objective.all.sample(3).each { |objective| UserObjective.create(user_id: params[:user_id], objective: objective, assigned_at: Time.now) }
    render json: { status: 'success' }
  end

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
