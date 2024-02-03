class Admin::MatchesController < ApplicationController
  before_action :set_match, only: [:edit, :update, :destroy]
  before_action :authorize_match, only: [:edit, :update, :destroy]
  after_action :verify_authorized, only: [:edit, :update, :destroy]

  
  def index
    page = params[:page] || 1
    @matches = Match.where(event_id: nil).order('played_at DESC').page(page).per(100)
    @total_pages = @matches.total_pages
    @current_page = @matches.current_page
    @matches = serialize_matches(@matches)
  end

  def destroy
    match_time = @match.played_at
    Rails.cache.delete("rankings_#{match_time.month}/#{match_time.year}")
    @match.delete
    redirect_to admin_matches_path
  end

  private
  def set_match
    @match = Match.find_by_id(params[:id])
  end

  def authorize_match
    authorize @match
  end

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
