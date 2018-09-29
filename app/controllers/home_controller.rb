class HomeController < ApplicationController
  def index
    matches = Match.all

    RankingEngine.new(@users, matches).generate_rankings
    @rankings = @users.sort_by(&:ranking).reverse
  end
end
