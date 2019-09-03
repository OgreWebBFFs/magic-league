namespace :cards do
  desc "populate cards of passed in set_code"
  task :populate, [:set_code] => [:environment] do|task, args|
    #get cards from passed in set_code
    MTG::Card.where(set: args[:set_code]).all.each do |card|
      puts "procesing card: #{card.name}"
      resource = Card.find_or_create_by(name: card.name)
      resource.description = card.text
      resource.image_url = card.image_url
      resource.set = card.set
      resource.save!
    end
  end
end
