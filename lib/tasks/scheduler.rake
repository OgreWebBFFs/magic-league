require 'date'

task :check_new_month => :environment do
  puts "Checking date..."
  date = DateTime.now
  if date.day === 1
    prev_month = date << 1
    last_month_rankings = RankingEngine.new(prev_month).generate_rankings
    OgreBot.instance.congratulate_champ last_month_rankings[0], prev_month
  end
  puts "done"
end