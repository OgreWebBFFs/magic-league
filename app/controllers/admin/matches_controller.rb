class Admin::MatchesController < ApplicationController
  before_action :set_match, only: [:edit, :update, :destroy]
  before_action :authorize_match, only: [:edit, :update, :destroy]
  after_action :verify_authorized, only: [:edit, :update, :destroy]

  
  def index
    @matches = Match.order('played_at DESC').map { |match| 
      OpenStruct.new({
        winner: match.get_user_in_place(1).name,
        loser: match.get_user_in_place(2).name,
        date: match.played_at.strftime("%a %b #{match.played_at.day.ordinalize}"),
        time: match.played_at.strftime("%I:%M%p"),
        id: match.id
      })
    }
  
  end

  def edit
    
  end

  def update
    if @match.update(match_params)
      redirect_to admin_matches_path
    else
      render @match
    end
  end

  def destroy
    @match.destroy
    redirect_to admin_matches_path
  end

  private
  def set_match
    @match = Match.find_by_id(params[:id])
  end

  def authorize_match
    authorize @match
  end

  def match_params
    params.require(:match).permit(:winner_id, :loser_id, :played_at) 
  end

  
end
