require 'rails_helper'

describe 'RankingEngine' do
  it 'generates Elo for two users and one match' do
    zack = User.create(name: 'Zack Brown', email: 'zacktbrown@gmail.com', password: '12345678')
    pat = User.create(name: 'Pat Roach', email: 'pat@gmail.com', password: '12345678')

    Match.create(winner: zack, loser: pat, played_at: Time.now)

    users = User.all
    RankingEngine.new(users, Match.all).generate_rankings

    expect(users.first.ranking).to eq(1216)
    expect(users.last.ranking).to eq(1184)
  end
  it 'generates Elo for two users and three matches where one match is added in between two existing matches' do 
    zack = User.create(name: 'Zack Brown', email: 'zacktbrown@gmail.com', password: '12345678')
    pat = User.create(name: 'Pat Roach', email: 'pat@gmail.com', password: '12345678')

    Match.create(winner: zack, loser: pat, played_at: 2.days.ago)
    Match.create(winner: pat, loser: zack, played_at: 2.days.from_now)

    users = User.all
    RankingEngine.new(users, Match.all).generate_rankings

    expect(users.first.ranking.floor).to eq(1198)
    expect(users.last.ranking.floor).to eq(1201)

    Match.create(winner: zack, loser: pat, played_at: Time.now)

    RankingEngine.new(users, Match.all).generate_rankings

    expect(users.first.ranking.floor).to eq(1214)
    expect(users.last.ranking.floor).to eq(1185)
  end
  context 'perf test' do 
    it "is performant on small sets" do 
      users = 12.times.map {|x| User.create(name: "User #{x}", email: "user#{x}@gmail.com", password: "12345679") }
      1000.times { users.shuffle!; Match.create(winner: users.first, loser: users.last, played_at: Time.now)}

      time = Benchmark.measure { RankingEngine.new(users, Match.all).generate_rankings }

      expect(time.real).to be < 0.1
    end
  end
end
