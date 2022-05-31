class MatchesController < ApplicationController
  def create
    date_time = DateTime.strptime(match_params[:date]+ " " + match_params[:time], "%Y-%m-%d %H:%M")
    loser = ([match_params[:playerA], match_params[:playerB]] - [match_params[:winner]]).first
    match = Match.create(played_at: date_time, participants: 2)
    Result.create(match_id: match.id, user_id: match_params[:winner], place: 1)
    Result.create(match_id: match.id, user_id: loser, place: 2)
    redirect_to :root
  end

  
  def index
    @matches = Match.order('played_at DESC').map { |match|
      winner = match.get_user_in_place(1)
      loser = match.get_user_in_place(2)
      OpenStruct.new({
        winner: winner.name,
        loser: loser.name,
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
