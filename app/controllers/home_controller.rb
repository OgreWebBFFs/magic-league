class HomeController < ApplicationController
  def index
    @match_date = params[:match_date] ? DateTime.new(params[:match_date][:year].to_i, params[:match_date][:month].to_i, params[:match_date][:day].to_i) : DateTime.now

    @ranked_players = RankingEngine.new(@match_date).generate_rankings
    @unranked_players = User.all.select{ |u| !@ranked_players.any? { |r| r.user === u }}

    @announcement = OgreBot.instance.link_to_recent_announcement
  end
end
