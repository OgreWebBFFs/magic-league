class RankingEngine
  INITIAL_RANKING = 1200
  K = 32

  def initialize(date)
    @date = date
    @cache_key = "rankings_#{date.month}/#{date.year}"
  end
  
  def generate_rankings
    Rails.cache.fetch(@cache_key) {
      matches = Match.where(event_id: nil).played_during_month(@date).order('played_at ASC')
      users = User.all.select{|u| matches.any? {|m| m.includes_user? u }}
      rankings = users.map {|user| Ranking.new(user, INITIAL_RANKING)}
      matches.each do |match|
        generate_elo_for_match(match, rankings) 
      end
      rankings.sort_by{|r| r.elo}.reverse
    }
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
    winner.wins = winner.wins + 1
    loser.losses = loser.losses + 1
  end
end

class Ranking
  attr_accessor :elo
  attr_accessor :wins
  attr_accessor :losses
  attr_reader :user
  def initialize(user, elo)
    @user = user
    @elo = elo
    @wins = 0
    @losses = 0
  end

  def elo=(new_value)
    @elo = new_value.round(2)
  end
end
