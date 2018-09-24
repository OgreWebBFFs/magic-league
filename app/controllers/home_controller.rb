class HomeController < ApplicationController
  def index
    @users = User.all
    matches = Match.all

    RankingEngine.new(@users, matches).generate_rankings
    @users = @users.sort_by(&:ranking).reverse
  end
end
