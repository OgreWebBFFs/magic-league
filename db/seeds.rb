# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

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
    user.save
  end
end

zack = User.find_by(name: "Zack Brown")
pat = User.find_by(name: "Pat Roach")

card1 = Card.find_or_create_by(name: "Blade Man", image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=452751&type=card")
card2 = Card.find_or_create_by(name: "Bounty Person", image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=452752&type=card")
card3 = Card.find_or_create_by(name: "Candlelight Thing", image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=452753&type=card")


Ownership.find_or_create_by(card_id: card1.id, collection_id: zack.collection.id).save
Ownership.find_or_create_by(card_id: card2.id, collection_id: zack.collection.id).save
Ownership.find_or_create_by(card_id: card3.id, collection_id: zack.collection.id).save

Ownership.find_or_create_by(card_id: card1.id, collection_id: pat.collection.id).save
Ownership.find_or_create_by(card_id: card2.id, collection_id: pat.collection.id).save
Ownership.find_or_create_by(card_id: card3.id, collection_id: pat.collection.id).save
