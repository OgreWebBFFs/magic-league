class HomeController < ApplicationController
  def index
    @match_date = params[:match_date] ? DateTime.new(params[:match_date][:year].to_i, params[:match_date][:month].to_i, params[:match_date][:day].to_i) : DateTime.now
    @matches = Match.played_during_month(@match_date)
    @users = @users.select{|u| u.locked_at.nil? || @matches.any? {|m| m.winner_id == u.id || m.loser_id == u.id } }

    RankingEngine.new(@users, @matches).generate_rankings
    @rankings = @users.sort_by(&:ranking).reverse
    @ranked_players = @rankings.select { |user|
      user_wins = @matches.where(winner: user).count
      user_losses = @matches.where(loser: user).count
      user_wins + user_losses > 0
    }
    @unranked_players = @rankings.select { |user|
      user_wins = @matches.where(winner: user).count
      user_losses = @matches.where(loser: user).count
      user_wins + user_losses == 0
    }.sort_by{ |user| user.name }
  end
end
