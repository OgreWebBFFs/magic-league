class HomeController < ApplicationController
  def index
    @match_date = params[:match_date] ? DateTime.new(params[:match_date][:year].to_i, params[:match_date][:month].to_i, params[:match_date][:day].to_i) : DateTime.now

    @matches = Match.where(event_id: nil).played_during_month(@match_date)
    @users = @users.select{|u| u.locked_at.nil? || @matches.any? {|m| m.winner_id == u.id || m.loser_id == u.id } }

    rankings = RankingEngine.new(@users, @matches).generate_rankings
    rankings = rankings.sort_by{|r| r.elo}.reverse

    ranker = PlayerRanker.new(@matches, rankings)
    @ranked_players = ranker.ranked_players
    @unranked_players = ranker.unranked_players

    @event_matches = Match.where(event_id: 1)
    event_rankings = EventRankingEngine.new(@users, @event_matches).generate_event_rankings
    event_rankings = event_rankings.sort_by{|r| r.opponents_defeated + (2 * r.objectives_completed)}.reverse

    event_ranker = PlayerRanker.new(@event_matches, event_rankings)
    @event_ranked_players = event_ranker.ranked_players
    @event_unranked_players = event_ranker.unranked_players
  end
end
