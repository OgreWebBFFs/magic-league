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
    @matches = Match.where(event_id: nil).order('played_at DESC')
    @matches = serialize_matches(@matches)
    @event_matches = Match.where(event_id: 1).order('played_at DESC')
    @event_matches = serialize_matches(@event_matches)
  end

  private

  def serialize_matches(matches)
    matches.map{ |match| 
      places = []
      while places.length < match.participants
        places.push(match.get_user_in_place(places.length + 1).name)
      end
      OpenStruct.new({
        places: places,
        date: match.played_at.strftime("%a %b #{match.played_at.day.ordinalize}"),
        time: match.played_at.strftime("%I:%M%p"),
        id: match.id
      })
    }
  end
end
