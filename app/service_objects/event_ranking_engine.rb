class EventRankingEngine

  def generate_event_rankings(users)
    rankings = users.map {|user| EventRanking.new(user)}
    rankings.each do |ranking|
      add_victory_points(ranking)
      add_matches(ranking)
    end
    rankings
  end

  def generate_event_user_ranking(user)
    ranking = EventRanking.new(user)
    add_victory_points(ranking)
    add_matches(ranking)
    ranking
  end
  
  private 

  def add_victory_points(ranking)
    ranking.user.victories.select{ |m| m.event_id == 1}.each do |match|
      ranking.victory_points = ranking.victory_points + match.participants - 1
    end
  end

  def add_matches(ranking)
    ranking.matches = ranking.user.matches.select{ |m| m.event_id == 1}.length
  end
end

class EventRanking
  attr_accessor :victory_points
  attr_accessor :objective_points
  attr_accessor :matches
  attr_reader :user
  def initialize(user)
    @user = user
    @objective_points = user.completed_objectives.length * 2
    @victory_points = 0;
    @matches = 0;
  end

  def event_points
    victory_points + objective_points
  end

  def serialize
    OpenStruct.new({
      name: self.user.name,
      id: self.user.id,
      ranking: self.event_points,
      matches: self.matches,
      victory_points: self.victory_points,
      objective_points: self.objective_points
    }) 
  end
end
