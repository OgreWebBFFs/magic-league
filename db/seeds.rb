# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

# Settings
# ==================================================
Setting.find_or_create_by(id: 1)

# Users 
# ==================================================
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

User.all.each do |user|
  user.unlock_access!
end

# Card ownerships 
# ==================================================
zack = User.find_by(name: "Zack Brown")
pat = User.find_by(name: "Pat Roach")
dustin = User.find_by(name: "Dustin Perzanowski")

card1 = Card.find_or_create_by(name: "Blade Man", image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=452751&type=card", rarity: "common")
card2 = Card.find_or_create_by(name: "Bounty Person", image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=452752&type=card", rarity: "rare")
card3 = Card.find_or_create_by(name: "Candlelight Thing", image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=452753&type=card", rarity: "common")


Ownership.find_or_create_by(card_id: card1.id, collection_id: zack.collection.id).save
Ownership.find_or_create_by(card_id: card2.id, collection_id: zack.collection.id).save
Ownership.find_or_create_by(card_id: card3.id, collection_id: zack.collection.id).save

Ownership.find_or_create_by(card_id: card1.id, collection_id: pat.collection.id).save
Ownership.find_or_create_by(card_id: card2.id, collection_id: pat.collection.id).save
Ownership.find_or_create_by(card_id: card3.id, collection_id: pat.collection.id).save

Ownership.find_or_create_by(card_id: card1.id, collection_id: dustin.collection.id).save
Ownership.find_or_create_by(card_id: card1.id, collection_id: dustin.collection.id).save

# Matches 
# ==================================================
match1 = Match.find_or_create_by(played_at: Time.now, participants: 2)
Result.find_or_create_by(match: match1, user: pat, place: 1)
Result.find_or_create_by(match: match1, user: zack, place:2)

match2 = Match.find_or_create_by(played_at: Time.now, participants: 2)
Result.find_or_create_by(match: match2, user: dustin, place: 1)
Result.find_or_create_by(match: match2, user: zack, place:2)

match3 = Match.find_or_create_by(played_at: Time.now, participants: 2)
Result.find_or_create_by(match: match3, user: pat, place: 1)
Result.find_or_create_by(match: match3, user: dustin, place:2)

match4 = Match.find_or_create_by(played_at: Time.now, participants: 2)
Result.find_or_create_by(match: match4, user: zack, place: 1)
Result.find_or_create_by(match: match4, user: dustin, place: 2)

match5 = Match.find_or_create_by(played_at: Time.now, participants: 2)
Result.find_or_create_by(match: match5, user: zack, place: 1)
Result.find_or_create_by(match: match5, user: pat, place: 2)

match6 = Match.find_or_create_by(played_at: Time.now, participants: 2)
Result.find_or_create_by(match: match6, user: zack, place: 1)
Result.find_or_create_by(match: match6, user: dustin, place: 2)

# Trades
# ===================================================
pat_zack_trade = Trade.find_or_create_by(from_user: pat.id, to_user: zack.id)
pat_dustin_trade = Trade.find_or_create_by(from_user: pat.id, to_user: dustin.id)
dustin_zack_trade = Trade.find_or_create_by(from_user: dustin.id, to_user: zack.id, status: 'approved')
 
Exchange.find_or_create_by(card_id: card1.id, user_id: pat.id, trade_id: pat_zack_trade.id)
Exchange.find_or_create_by(card_id: card2.id, user_id: zack.id, trade_id: pat_zack_trade.id)
Exchange.find_or_create_by(card_id: card3.id, user_id: dustin.id, trade_id: pat_dustin_trade.id)
Exchange.find_or_create_by(card_id: card2.id, user_id: dustin.id, trade_id: pat_dustin_trade.id)
Exchange.find_or_create_by(card_id: card2.id, user_id: pat.id, trade_id: pat_dustin_trade.id)
Exchange.find_or_create_by(card_id: card1.id, user_id: dustin.id, trade_id: dustin_zack_trade.id)
Exchange.find_or_create_by(card_id: card2.id, user_id: zack.id, trade_id: dustin_zack_trade.id)