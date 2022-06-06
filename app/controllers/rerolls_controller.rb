class RerollsController < ApplicationController
  def create
    established_allowed = Reroll.first&.allowed.presence || 1
    Reroll.create(user_id: params[:user_id], used: 0, allowed: established_allowed)
    render json: { status: 'success' }
  end
end
