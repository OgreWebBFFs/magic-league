class MatchesController < ApplicationController
  def create
    match_params = params[:match]
    date_time = Time.strptime("#{match_params[:date] } #{match_params[:time]} UTC#{match_params[:zone]}", "%Y-%m-%d %H:%M %z")

    match = Match.create(played_at: date_time, participants: match_params[:participants].to_i, event_id: match_params[:event])
    
    place = 1
    while params[:match][place.to_s] != nil do
      Result.create(match_id: match.id, user_id: match_params[place.to_s], place: place)
      place += 1
    end
    Rails.cache.delete("rankings_#{date_time.month}/#{date_time.year}")
    redirect_to :root
  end

  
  def index
    page = params[:page] || 1
    @matches = Match.where(event_id: nil).order('played_at DESC').page(page).per(100)
    @total_pages = @matches.total_pages
    @current_page = @matches.current_page
    @matches = serialize_matches(@matches)
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
