namespace :cards do
  desc "add multiverse_id to cards"
  task :multiverse_id => [:environment] do|task, args|
    Card.all.each do |card|
      puts "procesing card: #{card.name}"
      multi_id = card.image_url[/=(.*?)&/m,1] 
      card.multiverse_id = multi_id
      card.save!
    end
  end

  desc "get scryfall image"
  task :get_scryfall_image => [:environment] do |task, args|
    Card.all.each do |card|
      puts "procesing card: #{card.name}"
      begin
      response = JSON.parse(RestClient.get("https://api.scryfall.com/cards/multiverse/#{card.multiverse_id}"))
      rescue StandardError => e
        puts e 
      end
      begin
        card.image_url = response['image_uris']['png']
        card.save! unless card.image_url.nil?
      rescue StandardError => e
        puts e
        puts card.name
      end
    end
  end
end

