require 'ostruct'

class PlayerRanker
  def initialize(matches, rankings)
    @matches = matches
    @rankings = rankings
  end

  def ranked_players
    @rankings.select { |ranking| has_played_any_matches?(ranking.user) }.map { |ranking| serialize(ranking) } 
  end

  def unranked_players
    @rankings.select { |ranking| !has_played_any_matches?(ranking.user) }.map { |ranking| serialize(ranking) } 
  end

  private

  def has_played_any_matches?(user)
    users_in_match = @matches.select{ |m| m.users_in_match.any? { |u| u.id == user.id }}.any?
  end

  def serialize(ranking)
    OpenStruct.new({name:ranking.user.name, id: ranking.user.id, ranking: ranking.elo.round(2), wins: @matches.select{ |m| m.get_user_in_place(1).id == ranking.user.id }.count,  losses: @matches.select { |m| m.get_user_in_place(2).id == ranking.user.id }.count}) 
  end
end
