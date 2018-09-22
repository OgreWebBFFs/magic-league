class RankingEngine
  INITIAL_RANKING = 1200
  K = 32

  def initialize(users, matches)
    @users = users
    @matches = matches
  end

  def generate_rankings
    @users.each {|user| user.ranking = INITIAL_RANKING}
    @matches.each do |match|
      generate_elo_for_match(match) 
    end
  end 

  private 

  def generate_elo_for_match(match)
    winner = @users.find{|u| u.id == match.winner_id }
    loser = @users.find{|u| u.id == match.loser_id }
    r1 = 10**(winner.ranking / 400.0)
    r2 = 10**(loser.ranking / 400.0)
    e1 = r1 / (r1 + r2)
    e2 = r2 / (r1 + r2)
    s1 = 1.0
    s2 = 0.0
    winner.ranking = winner.ranking + (K * (s1 - e1))
    loser.ranking = loser.ranking + (K * (s2 - e2))
  end
end
