class Admin::ObjectivesController < ApplicationController
  before_action :authorize_objective, only: [:create, :update, :destroy]
  after_action :verify_authorized, only: [:create, :update, :destroy]

  def create
    Objective.create(description: params[:description], value: params[:value])
    render json: {status: 'success'}
  end

  def update
    objective = Objective.find(params[:id])
    objective.update(description: params[:description], value: params[:value])
    render json: {status: 'success'}
  end

  def destroy
    objective = Objective.find(params[:id])
    objective.destroy
    render json: {status: 'success'}
  end

  def index
    @objectives = Objective.all
    @reroll_count = Reroll.first&.allowed.presence || 1
  end

  private 
  def authorize_objective
    authorize Objective
  end

end