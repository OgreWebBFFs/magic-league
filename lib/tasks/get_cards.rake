namespace :cards do
  desc "populate cards of passed in set_code"
  task :populate, [:set_code, :start_num, :end_num] => [:environment] do |task, args|
    args.with_defaults(:start_num => "0", :end_num => "0")
    #get cards from passed in set_code
    if args[:start_num].to_i > 0 && args[:end_num].to_i > 0
        response = {"has_more" => true, "next_page" => "https://api.scryfall.com/cards/search?order=name&q=e:#{args[:set_code]}+cn>=#{args[:start_num]}+cn<=#{args[:end_num]}"}
    elsif args[:start_num].to_i > 0
        response = {"has_more" => true, "next_page" => "https://api.scryfall.com/cards/search?order=name&q=e:#{args[:set_code]}+cn=#{args[:start_num]}"}
    else
        response = {"has_more" => true, "next_page" => "https://api.scryfall.com/cards/search?order=name&q=e:#{args[:set_code]}"}
    end

    until !response['has_more'] do
      response = JSON.parse(RestClient.get(response['next_page']))
      response['data'].each do |card|
        puts "Processing #{card['name']}"
        Card.create_from_scryfall_response(card)
      end
  end
    
  end

  task :populate_the_list, [] => [:environment] do
    file_path = './config/the_list_cards.txt'

    if File.exist?(file_path)
      File.foreach(file_path) do |line|
        name = line.chomp
        response = {"has_more" => true, "next_page" => "https://api.scryfall.com/cards/search?order=name&q=e:plst+\"#{CGI.escape(name)}\""}
        response = JSON.parse(RestClient.get(response['next_page']))
        card = response['data'][0]
        puts "Processing #{card['name']}"
        Card.create_from_scryfall_response(card)
      end
    else
      puts "File not found: #{file_path}"
    end
  end
end
