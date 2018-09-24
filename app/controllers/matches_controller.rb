class MatchesController < ApplicationController
  def create
    date_time = DateTime.strptime(match_params[:date]+ " " + match_params[:time], "%Y-%m-%d %H:%M")
    loser = ([match_params[:playerA], match_params[:playerB]] - [match_params[:winner]]).first
    Match.create(winner_id: match_params[:winner], loser_id: loser, played_at: date_time)
    redirect_to :root
  end

  private

  def match_params
    params.require(:match).permit(:playerA, :playerB, :winner, :date, :time) 
  end
end
