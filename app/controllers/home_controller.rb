class HomeController < ApplicationController
  def index
    @users = User.all
    matches = Match.all

    RankingEngine.new(@users, matches).generate_rankings
    @users = @users.sort_by(&:ranking).reverse
    
    @default_match_date = Date.today
    @default_match_time = Time.new.strftime("%H:%M")
  end
end
