class MatchesController < ApplicationController
  def create
    match_params = params[:match]
    date_time = DateTime.strptime(match_params[:date]+ " " + match_params[:time], "%Y-%m-%d %H:%M")
    match = Match.create(played_at: date_time, participants: match_params[:participants].to_i, event_id: match_params[:event])
    
    place = 1
    while params[:match][place.to_s] != nil do
      Result.create(match_id: match.id, user_id: match_params[place.to_s], place: place)
      place += 1
    end
    
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
end
