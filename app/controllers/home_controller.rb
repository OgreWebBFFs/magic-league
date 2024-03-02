class HomeController < ApplicationController
  def index
    @match_date = params[:match_date] ? Time.new(params[:match_date][:year].to_i, params[:match_date][:month].to_i, params[:match_date][:day].to_i) : Time.now

    @ranked_players = RankingEngine.new(@match_date).generate_rankings
    @unranked_players = User.all.select{ |u| u.locked_at.nil? && !@ranked_players.any? { |r| r.user === u }}
  end
end
