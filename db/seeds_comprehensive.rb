# Comprehensive seed file for Magic League
# This creates realistic test data for all features

puts "🌱 Starting comprehensive seed process..."

# Settings
puts "Creating settings..."
Setting.find_or_create_by(id: 1)

# Users
puts "Creating users..."
users = []
users << User.find_or_create_by(email: "patrickwroach@gmail.com", name: "Pat Roach", admin: true)
users << User.find_or_create_by(email: "zack.t.brown@gmail.com", name: "Zack Brown")
users << User.find_or_create_by(email: "mike@gmail.com", name: "Mike Stempler")
users << User.find_or_create_by(email: "joe@gmail.com", name: "Joe Handzel", admin: true)
users << User.find_or_create_by(email: "dustin@gmail.com", name: "Dustin Perzanowski")
users << User.find_or_create_by(email: "ryan@gmail.com", name: "Ryan Branch")
users << User.find_or_create_by(email: "perz13@gmail.com", name: "D#R", admin: true)

users.each do |user|
  unless user.id
    user.collection = Collection.new
    user.password = "12345678"
    user.password_confirmation = "12345678"
    user.save
  end
end

User.all.each { |user| user.unlock_access! }
puts "✓ Created #{User.count} users"

# Get user references
zack = User.find_by(name: "Zack Brown")
pat = User.find_by(name: "Pat Roach")
dustin = User.find_by(name: "Dustin Perzanowski")
mike = User.find_by(name: "Mike Stempler")
joe = User.find_by(name: "Joe Handzel")
ryan = User.find_by(name: "Ryan Branch")

# Cards
puts "Creating cards..."
cards = []
cards << Card.find_or_create_by(name: "Black Lotus", image_url: "https://cards.scryfall.io/normal/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg", rarity: "mythic", set: "Alpha")
cards << Card.find_or_create_by(name: "Lightning Bolt", image_url: "https://cards.scryfall.io/normal/front/f/2/f29ba16f-c8fb-42fe-aabf-87089cb214a7.jpg", rarity: "common", set: "Limited Edition Alpha")
cards << Card.find_or_create_by(name: "Counterspell", image_url: "https://cards.scryfall.io/normal/front/1/b/1b73577a-8ca1-41d7-9b2b-7300286fde43.jpg", rarity: "common", set: "Limited Edition Alpha")
cards << Card.find_or_create_by(name: "Sol Ring", image_url: "https://cards.scryfall.io/normal/front/1/9/199cde21-5bc3-49cd-acd4-bae3af6e5881.jpg", rarity: "uncommon", set: "Commander Legends")
cards << Card.find_or_create_by(name: "Mox Ruby", image_url: "https://cards.scryfall.io/normal/front/4/5/45fd6e91-df76-497f-b642-33dc3d5f6a5a.jpg", rarity: "mythic", set: "Alpha")
cards << Card.find_or_create_by(name: "Tarmogoyf", image_url: "https://cards.scryfall.io/normal/front/6/9/69daba76-96e8-4bcc-ab79-2f00189ad8fb.jpg", rarity: "rare", set: "Future Sight")
cards << Card.find_or_create_by(name: "Birds of Paradise", image_url: "https://cards.scryfall.io/normal/front/f/e/feefe9f0-24a6-461c-9ef1-86c5a6f33b83.jpg", rarity: "rare", set: "Ravnica Allegiance")
cards << Card.find_or_create_by(name: "Swords to Plowshares", image_url: "https://cards.scryfall.io/normal/front/e/f/ef51caf8-f9d9-48d7-9145-9dfc91054f70.jpg", rarity: "uncommon", set: "Commander Legends")
cards << Card.find_or_create_by(name: "Brainstorm", image_url: "https://cards.scryfall.io/normal/front/4/8/48070245-1370-4cf1-be15-d4e8a8b92ba8.jpg", rarity: "common", set: "Commander Legends")
cards << Card.find_or_create_by(name: "Dark Ritual", image_url: "https://cards.scryfall.io/normal/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.jpg", rarity: "common", set: "Alpha")
cards << Card.find_or_create_by(name: "Force of Will", image_url: "https://cards.scryfall.io/normal/front/d/d/dd60b291-0a88-4e8e-bef8-76cdfd6c8183.jpg", rarity: "rare", set: "Alliances")
cards << Card.find_or_create_by(name: "Path to Exile", image_url: "https://cards.scryfall.io/normal/front/9/d/9d607a40-608a-44cd-b946-02636b5bea9f.jpg", rarity: "uncommon", set: "Conflux")
cards << Card.find_or_create_by(name: "Demonic Tutor", image_url: "https://cards.scryfall.io/normal/front/3/b/3bdbc231-5316-4abd-9d8d-d87cff2c9847.jpg", rarity: "rare", set: "Alpha")
cards << Card.find_or_create_by(name: "Mana Crypt", image_url: "https://cards.scryfall.io/normal/front/4/d/4d960186-4559-4af0-bd22-63baa15f8939.jpg", rarity: "mythic", set: "Eternal Masters")
cards << Card.find_or_create_by(name: "Llanowar Elves", image_url: "https://cards.scryfall.io/normal/front/8/b/8bbcfb77-daa1-4ce5-b5f9-48d0a8edbba9.jpg", rarity: "common", set: "Dominaria")
puts "✓ Created #{Card.count} cards"

# Ownerships
puts "Creating card ownerships..."
Ownership.find_or_create_by(card: cards[0], collection: pat.collection, quantity: 1, keeper: true)
Ownership.find_or_create_by(card: cards[4], collection: pat.collection, quantity: 1, keeper: true)
Ownership.find_or_create_by(card: cards[5], collection: pat.collection, quantity: 2)
Ownership.find_or_create_by(card: cards[10], collection: pat.collection, quantity: 1)
Ownership.find_or_create_by(card: cards[12], collection: pat.collection, quantity: 1)

Ownership.find_or_create_by(card: cards[1], collection: zack.collection, quantity: 4)
Ownership.find_or_create_by(card: cards[2], collection: zack.collection, quantity: 3)
Ownership.find_or_create_by(card: cards[3], collection: zack.collection, quantity: 2)
Ownership.find_or_create_by(card: cards[8], collection: zack.collection, quantity: 4)
Ownership.find_or_create_by(card: cards[14], collection: zack.collection, quantity: 4)

Ownership.find_or_create_by(card: cards[6], collection: dustin.collection, quantity: 2)
Ownership.find_or_create_by(card: cards[7], collection: dustin.collection, quantity: 3)
Ownership.find_or_create_by(card: cards[11], collection: dustin.collection, quantity: 2)
Ownership.find_or_create_by(card: cards[1], collection: dustin.collection, quantity: 2)

Ownership.find_or_create_by(card: cards[9], collection: mike.collection, quantity: 4)
Ownership.find_or_create_by(card: cards[3], collection: mike.collection, quantity: 1)
Ownership.find_or_create_by(card: cards[14], collection: mike.collection, quantity: 3)

Ownership.find_or_create_by(card: cards[13], collection: joe.collection, quantity: 1, keeper: true)
Ownership.find_or_create_by(card: cards[5], collection: joe.collection, quantity: 1)
Ownership.find_or_create_by(card: cards[2], collection: joe.collection, quantity: 2)

Ownership.find_or_create_by(card: cards[7], collection: ryan.collection, quantity: 2)
Ownership.find_or_create_by(card: cards[8], collection: ryan.collection, quantity: 3)
Ownership.find_or_create_by(card: cards[1], collection: ryan.collection, quantity: 1)
puts "✓ Created #{Ownership.count} ownerships"

# Wishes
puts "Creating wishes..."
Wish.find_or_create_by(user: pat, card: cards[6])
Wish.find_or_create_by(user: pat, card: cards[9])
Wish.find_or_create_by(user: zack, card: cards[0])
Wish.find_or_create_by(user: zack, card: cards[5])
Wish.find_or_create_by(user: zack, card: cards[10])
Wish.find_or_create_by(user: dustin, card: cards[13])
Wish.find_or_create_by(user: dustin, card: cards[5])
Wish.find_or_create_by(user: mike, card: cards[0])
Wish.find_or_create_by(user: mike, card: cards[10])
Wish.find_or_create_by(user: ryan, card: cards[4])
Wish.find_or_create_by(user: ryan, card: cards[12])
puts "✓ Created #{Wish.count} wishes"

# Matches
puts "Creating matches..."
match1 = Match.find_or_create_by(played_at: 2.days.ago, participants: 2)
Result.find_or_create_by(match: match1, user: pat, place: 1)
Result.find_or_create_by(match: match1, user: zack, place: 2)

match2 = Match.find_or_create_by(played_at: 3.days.ago, participants: 3)
Result.find_or_create_by(match: match2, user: dustin, place: 1)
Result.find_or_create_by(match: match2, user: zack, place: 2)
Result.find_or_create_by(match: match2, user: mike, place: 3)

match3 = Match.find_or_create_by(played_at: 4.days.ago, participants: 4)
Result.find_or_create_by(match: match3, user: joe, place: 1)
Result.find_or_create_by(match: match3, user: pat, place: 2)
Result.find_or_create_by(match: match3, user: ryan, place: 3)
Result.find_or_create_by(match: match3, user: dustin, place: 4)

match4 = Match.find_or_create_by(played_at: 1.week.ago, participants: 2)
Result.find_or_create_by(match: match4, user: zack, place: 1)
Result.find_or_create_by(match: match4, user: dustin, place: 2)

match5 = Match.find_or_create_by(played_at: 10.days.ago, participants: 3)
Result.find_or_create_by(match: match5, user: zack, place: 1)
Result.find_or_create_by(match: match5, user: pat, place: 2)
Result.find_or_create_by(match: match5, user: joe, place: 3)

match6 = Match.find_or_create_by(played_at: 2.weeks.ago, participants: 2)
Result.find_or_create_by(match: match6, user: ryan, place: 1)
Result.find_or_create_by(match: match6, user: mike, place: 2)

match7 = Match.find_or_create_by(played_at: 3.weeks.ago, participants: 4)
Result.find_or_create_by(match: match7, user: pat, place: 1)
Result.find_or_create_by(match: match7, user: zack, place: 2)
Result.find_or_create_by(match: match7, user: dustin, place: 3)
Result.find_or_create_by(match: match7, user: ryan, place: 4)
puts "✓ Created #{Match.count} matches with #{Result.count} results"

# Trades
puts "Creating trades..."
trade1 = Trade.create(status: 'pending')
Exchange.find_or_create_by(card: cards[6], to_user: pat, from_user: dustin, trade: trade1)
Exchange.find_or_create_by(card: cards[1], to_user: dustin, from_user: pat, trade: trade1)

trade2 = Trade.create(status: 'approved')
Exchange.find_or_create_by(card: cards[9], to_user: zack, from_user: mike, trade: trade2)
Exchange.find_or_create_by(card: cards[2], to_user: mike, from_user: zack, trade: trade2)

trade3 = Trade.create(status: 'pending')
Exchange.find_or_create_by(card: cards[8], to_user: ryan, from_user: zack, trade: trade3)
Exchange.find_or_create_by(card: cards[7], to_user: zack, from_user: ryan, trade: trade3)

trade4 = Trade.create(status: 'approved')
Exchange.find_or_create_by(card: cards[2], to_user: pat, from_user: joe, trade: trade4)
Exchange.find_or_create_by(card: cards[12], to_user: joe, from_user: pat, trade: trade4)
puts "✓ Created #{Trade.count} trades with #{Exchange.count} exchanges"

# Draffles
puts "Creating draffles..."
draffle1 = Draffle.find_or_create_by(
  name: "Summer 2024 Draffle",
  status: "completed",
  rounds: 3,
  snake: true,
  welcome: "Welcome to the Summer 2024 Draffle! Good luck!",
  created_at: 2.months.ago
)

DraffleParticipant.find_or_create_by(draffle: draffle1, user: pat, order: 1)
DraffleParticipant.find_or_create_by(draffle: draffle1, user: zack, order: 2)
DraffleParticipant.find_or_create_by(draffle: draffle1, user: dustin, order: 3)
DraffleParticipant.find_or_create_by(draffle: draffle1, user: mike, order: 4)

pat_participant = DraffleParticipant.find_by(draffle: draffle1, user: pat)
zack_participant = DraffleParticipant.find_by(draffle: draffle1, user: zack)
dustin_participant = DraffleParticipant.find_by(draffle: draffle1, user: dustin)
mike_participant = DraffleParticipant.find_by(draffle: draffle1, user: mike)

DrafflePrize.find_or_create_by(draffle: draffle1, card_id: cards[5].id.to_s, draffle_participant_id: pat_participant.id, name: cards[5].name, image: cards[5].image_url)
DrafflePrize.find_or_create_by(draffle: draffle1, card_id: cards[3].id.to_s, draffle_participant_id: zack_participant.id, name: cards[3].name, image: cards[3].image_url)
DrafflePrize.find_or_create_by(draffle: draffle1, card_id: cards[7].id.to_s, draffle_participant_id: dustin_participant.id, name: cards[7].name, image: cards[7].image_url)
DrafflePrize.find_or_create_by(draffle: draffle1, card_id: cards[8].id.to_s, draffle_participant_id: mike_participant.id, name: cards[8].name, image: cards[8].image_url)

draffle2 = Draffle.find_or_create_by(
  name: "Winter 2025 Draffle",
  status: "active",
  rounds: 2,
  snake: true,
  welcome: "Welcome to the Winter 2025 Draffle! Let's draft some cards!",
  created_at: 1.week.ago
)

DraffleParticipant.find_or_create_by(draffle: draffle2, user: joe, order: 1)
DraffleParticipant.find_or_create_by(draffle: draffle2, user: ryan, order: 2)
DraffleParticipant.find_or_create_by(draffle: draffle2, user: pat, order: 3)
DraffleParticipant.find_or_create_by(draffle: draffle2, user: zack, order: 4)
DraffleParticipant.find_or_create_by(draffle: draffle2, user: dustin, order: 5)

DrafflePrize.find_or_create_by(draffle: draffle2, card_id: cards[10].id.to_s, name: cards[10].name, image: cards[10].image_url)
DrafflePrize.find_or_create_by(draffle: draffle2, card_id: cards[11].id.to_s, name: cards[11].name, image: cards[11].image_url)
DrafflePrize.find_or_create_by(draffle: draffle2, card_id: cards[6].id.to_s, name: cards[6].name, image: cards[6].image_url)
DrafflePrize.find_or_create_by(draffle: draffle2, card_id: cards[1].id.to_s, name: cards[1].name, image: cards[1].image_url)
DrafflePrize.find_or_create_by(draffle: draffle2, card_id: cards[14].id.to_s, name: cards[14].name, image: cards[14].image_url)

draffle3 = Draffle.find_or_create_by(
  name: "Spring 2025 Draffle",
  status: "pending",
  rounds: 3,
  snake: false,
  welcome: "Get ready for the Spring 2025 Draffle!",
  created_at: Time.now
)
puts "✓ Created #{Draffle.count} draffles with #{DraffleParticipant.count} participants and #{DrafflePrize.count} prizes"

puts ""
puts "🎉 Seed completed successfully!"
puts "="*50
puts "Summary:"
puts "  Users: #{User.count}"
puts "  Cards: #{Card.count}"
puts "  Ownerships: #{Ownership.count}"
puts "  Wishes: #{Wish.count}"
puts "  Matches: #{Match.count}"
puts "  Results: #{Result.count}"
puts "  Trades: #{Trade.count}"
puts "  Exchanges: #{Exchange.count}"
puts "  Draffles: #{Draffle.count}"
puts "  Draffle Participants: #{DraffleParticipant.count}"
puts "  Draffle Prizes: #{DrafflePrize.count}"
puts "="*50
