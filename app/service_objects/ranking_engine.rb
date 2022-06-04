class RankingEngine
  INITIAL_RANKING = 1200
  K = 32

  def initialize(users, matches)
    @users = users
    @matches = matches
  end

  def generate_rankings
    rankings = @users.map {|user| Ranking.new(user, INITIAL_RANKING)}
    @matches.each do |match|
      generate_elo_for_match(match, rankings) 
    end
    rankings
  end 

  private 

  def generate_elo_for_match(match, rankings)
    winner = rankings.find{|ranking| ranking.user.id == match.get_user_in_place(1).id }
    loser = rankings.find{|ranking| ranking.user.id == match.get_user_in_place(2).id }
    r1 = 10**(winner.elo / 400.0)
    r2 = 10**(loser.elo / 400.0)
    e1 = r1 / (r1 + r2)
    e2 = r2 / (r1 + r2)
    s1 = 1.0
    s2 = 0.0
    winner.elo = winner.elo + (K * (s1 - e1))
    loser.elo = loser.elo + (K * (s2 - e2))
  end
end

class Ranking
  attr_accessor :elo
  attr_reader :user
  def initialize(user, elo)
    @user = user
    @elo = elo
  end
end
