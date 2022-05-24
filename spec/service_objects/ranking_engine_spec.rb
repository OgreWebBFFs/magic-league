require 'rspec_helper'

describe 'RankingEngine' do
  it 'generates Elo for two users and one match' do
    users = [double(id: 1), double(id: 2)]
    matches = [double(winner_id: 1, loser_id: 2)]
    rankings = RankingEngine.new(users, matches).generate_rankings

    expect(rankings.find{|ranking| ranking.user.id == 1}.elo).to be > 1200
    expect(rankings.find{|ranking| ranking.user.id == 2}.elo).to be < 1200
  end
  it 'generates Elo for two users and two matches' do
    users = [double(id: 1), double(id: 2)]
    matches = [double(winner_id: 1, loser_id: 2), double(winner_id: 2, loser_id: 1)]
    rankings = RankingEngine.new(users, matches).generate_rankings

    expect(rankings.find{|ranking| ranking.user.id == 1}.elo).to be < 1205 
    expect(rankings.find{|ranking| ranking.user.id == 2}.elo).to be > 1195
  end
end
