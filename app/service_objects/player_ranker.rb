require 'ostruct'

class PlayerRanker
  def initialize(matches, rankings)
    @matches = matches
    @rankings = rankings
  end

  def ranked_players
    @rankings.select { |ranking| has_played_any_matches?(ranking.user) }.map { |ranking| ranking.serialize } 
  end

  def unranked_players
    @rankings.select { |ranking| !has_played_any_matches?(ranking.user) }.map { |ranking| ranking.serialize } 
  end

  private

  def has_played_any_matches?(user)
    users_in_match = @matches.select{ |m| m.users_in_match.any? { |u| u.id == user.id }}.any?
  end

end
