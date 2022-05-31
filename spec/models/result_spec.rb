require 'rails_helper'

RSpec.describe Result, type: :model do
  it 'should fail when passed a placement of less than 0' do
    match = Match.new(participants: 4, played_at: nil)
    result = Result.new(match: match, user: nil, place: -1)
    expect(result).to_not be_valid
  end

  it 'should fail when passed a placement of greater than number of match participants' do
    match = Match.new(participants: 4, played_at: nil)
    result = Result.new(match: match, user: nil, place: 5)
    expect(result).to_not be_valid
  end

  it 'should be valid with valid params' do
    match = Match.new(participants: 4, played_at: nil)
    result = Result.new(match: match, user: nil, place: 3)
    expect(result).to be_valid
  end
end
