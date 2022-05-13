require 'rspec_helper'

describe 'PlayerRanker' do
  it 'returns the ranked players' do
    rankings = [double(user: double(id: 1, name: 'Zack'), elo: 1216), double(user: double(id: 2, name: 'Pat'))]
    matches = [double(winner_id: 1, loser_id: 3)]
    expect(PlayerRanker.new(matches, rankings).ranked_players.count).to eq(1)
    expect(PlayerRanker.new(matches, rankings).ranked_players.first.name).to eq('Zack')
  end
  it 'returns the unranked players' do
    rankings = [double(user: double(id: 1, name: 'Zack'), elo: 1216), double(user: double(id: 2, name: 'Pat'), elo: 1200)]
    matches = [double(winner_id: 1, loser_id: 3)]
    expect(PlayerRanker.new(matches, rankings).unranked_players.count).to eq(1)
    expect(PlayerRanker.new(matches, rankings).unranked_players.first.name).to eq('Pat')
  end
end
