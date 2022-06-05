class Admin::ObjectivesController < ApplicationController
  after_action :verify_authorized, only: [:create, :update, :destroy]

  def create
    Objective.create(description: params[:description], value: params[:value])
  end

  def update
    objective = Objective.find(params[:id])
    objective.update(description: params[:description], value: params[:value])
  end

  def destroy
    objective = Objective.find(params[:id])
    objective.destroy
  end

  def index
    objective = Objective.all
    render json: objective.to_json()
  end
end