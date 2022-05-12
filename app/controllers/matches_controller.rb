class MatchesController < ApplicationController
  def create
    date_time = DateTime.strptime(match_params[:date]+ " " + match_params[:time], "%Y-%m-%d %H:%M")
    loser = ([match_params[:playerA], match_params[:playerB]] - [match_params[:winner]]).first
    Match.create(winner_id: match_params[:winner], loser_id: loser, played_at: date_time)
    redirect_to :root
  end

  
  def index
    @matches = Match.order('played_at DESC').map { |match| 
      OpenStruct.new({
        winner: match.winner.name,
        loser: match.loser.name,
        date: match.played_at.strftime("%a %b #{match.played_at.day.ordinalize}"),
        time: match.played_at.strftime("%I:%M%p"),
        id: match.id
      })
    }
  
  end

  private

  def match_params
    params.require(:match).permit(:playerA, :playerB, :winner, :date, :time) 
  end
end
