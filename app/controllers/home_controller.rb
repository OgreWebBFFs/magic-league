class HomeController < ApplicationController
  def index
    @matches = Match.played_during_month(DateTime.now)

    RankingEngine.new(@users, @matches).generate_rankings
    @rankings = @users.sort_by(&:ranking).reverse
  end
end
