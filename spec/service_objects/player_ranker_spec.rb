require 'rspec_helper'

describe 'PlayerRanker' do
  
  before do
    @zack = double(id: 1, name: 'Zack')
    @guy = double(id: 3, name: 'Guy')
    @pat = double(id: 2, name: 'Pat')
    
    @zackRanking = double(user: @zack, elo: 1216)
    @patRanking = double(user: @pat)
    allow(@zackRanking).to receive(:serialize).and_return(@zack)
    allow(@patRanking).to receive(:serialize).and_return(@pat)
    
    @match = double()
    allow(@match).to receive(:get_user_in_place).with(1).and_return(@zack)
    allow(@match).to receive(:get_user_in_place).with(2).and_return(@guy)
    allow(@match).to receive(:users_in_match).and_return([@zack, @guy])
  end

  it 'returns the ranked players' do
    rankings = [@zackRanking, @patRanking]
    matches = [@match]
    expect(PlayerRanker.new(matches, rankings).ranked_players.count).to eq(1)
    expect(PlayerRanker.new(matches, rankings).ranked_players.first.name).to eq('Zack')
  end
  it 'returns the unranked players' do
    rankings = [@zackRanking, @patRanking]
    matches = [@match]
    expect(PlayerRanker.new(matches, rankings).unranked_players.count).to eq(1)
    expect(PlayerRanker.new(matches, rankings).unranked_players.first.name).to eq('Pat')
  end
end
