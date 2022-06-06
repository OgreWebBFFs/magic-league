class EventRankingEngine
  def initialize(users, matches)
    @users = users
    @matches = matches
  end

  def generate_event_rankings
    rankings = @users.map {|user| EventRanking.new(user)}
    @matches.each do |match|
      add_defeated_opponents(match, rankings) 
    end
    rankings
  end
  
  private 

  def add_defeated_opponents(match, rankings)
    place = 1
    while place <= match.participants
      ranking_to_update = rankings.find{|ranking| ranking.user.id == match.get_user_in_place(place).id}
      ranking_to_update.opponents_defeated = ranking_to_update.opponents_defeated + match.participants - place
      ranking_to_update.matches = ranking_to_update.matches + 1
      place = place + 1
    end
  end
end

class EventRanking
  attr_accessor :opponents_defeated
  attr_accessor :objectives_completed
  attr_accessor :matches
  attr_reader :user
  def initialize(user)
    @user = user
    @objectives_completed = user.completed_objectives.length
    @opponents_defeated = 0;
    @matches = 0;
  end

  def serialize
    OpenStruct.new({
      name:self.user.name,
      id: self.user.id,
      ranking: self.opponents_defeated + (2 * self.objectives_completed),
      matches: self.matches
    }) 
  end
end
