class RerollsController < ApplicationController
  def create
    established_allowed = Reroll.first&.allowed.presence || 1
    Reroll.create(user_id: params[:user_id], used: 0, allowed: established_allowed)
    render json: { status: 'success' }
  end

  def update
    reroll = Reroll.find(params[:id])
    if (reroll.can_roll)
      reroll.roll
      reroll.update(used: reroll.used + 1)
      render json: { status: 'success' }
    else
      render json: { status: 'error', message: 'cannot complete reroll' }, :status => 400
    end
  end

  def update_all
    Reroll.all.each{ |reroll| reroll.update(allowed: params[:allowed])}
    render json: { status: 'success' }
  end
end
