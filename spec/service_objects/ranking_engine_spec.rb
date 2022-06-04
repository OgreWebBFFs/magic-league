require 'rspec_helper'

describe 'RankingEngine' do
  before do
    @zack = double(id: 1, name: 'Zack')
    @pat = double(id: 2, name: 'Pat')
   
    @match = double()
    allow(@match).to receive(:get_user_in_place).with(1).and_return(@zack)
    allow(@match).to receive(:get_user_in_place).with(2).and_return(@pat)
    allow(@match).to receive(:users_in_match).and_return([@zack, @pat])

    @second_match = double()
    allow(@second_match).to receive(:get_user_in_place).with(1).and_return(@pat)
    allow(@second_match).to receive(:get_user_in_place).with(2).and_return(@zack)
    allow(@second_match).to receive(:users_in_match).and_return([@zack, @pat])
  end

  it 'generates Elo for two users and one match' do
    users = [@zack, @pat]
    matches = [@match]
    rankings = RankingEngine.new(users, matches).generate_rankings

    expect(rankings.find{|ranking| ranking.user.id == 1}.elo).to be > 1200
    expect(rankings.find{|ranking| ranking.user.id == 2}.elo).to be < 1200
  end

  it 'generates Elo for two users and two matches' do
    users = [@zack, @pat]
    matches = [@match, @second_match]
    rankings = RankingEngine.new(users, matches).generate_rankings

    expect(rankings.find{|ranking| ranking.user.id == 1}.elo).to be < 1205 
    expect(rankings.find{|ranking| ranking.user.id == 2}.elo).to be > 1195
  end
end
