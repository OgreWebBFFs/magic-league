class HomeController < ApplicationController
  def index
    matches = Match.all

    RankingEngine.new(@users, matches).generate_rankings
    @rankings = @users.sort_by(&:ranking).reverse
    
    @default_match_date = Date.today
    @default_match_time = Time.new.strftime("%H:%M")
  end
end
