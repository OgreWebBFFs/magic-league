class HomeController < ApplicationController
  def index
    @matches = Match.played_during_month(DateTime.now)

    RankingEngine.new(@users, @matches).generate_rankings
    @rankings = @users.all.unlocked.sort_by(&:ranking).reverse
    puts "about to print rankings"
    puts @rankings.inspect
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
