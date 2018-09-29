class HomeController < ApplicationController
  def index
    matches = Match.all

    RankingEngine.new(@users, matches).generate_rankings
    @sorted_users = @users.sort_by(&:ranking).reverse
  end
end
