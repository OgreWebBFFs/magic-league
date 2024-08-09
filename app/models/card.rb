class Card < ApplicationRecord
  has_many :ownerships
  has_many :collections, through: :ownerships 
  has_many :users, -> { distinct },  through: :collections 
  has_many :wishes
  scope :query_name, ->(string) { where(arel_table[:name].matches("%#{sanitize_sql_like string}%")) }
  scope :query_oracle_text, ->(string) { where(arel_table[:oracle_text].matches("%#{sanitize_sql_like string}%")) }
  scope :query_type_line, ->(string) { where(arel_table[:type_line].matches("%#{sanitize_sql_like string}%")) }
  scope :query_all_text, ->(string) { query_name(string).or(query_oracle_text(string)).or(query_type_line(string)) }

  def received_trades_to_update
    rarity == 'mythic' ? 'rare' : rarity
  end

  def self.create_from_scryfall_response card_res
    new_card = find_or_create_by(name: card_res['name'])
    new_card.description = card_res['text']
    if card_res['image_uris']
      new_card.image_url = card_res['image_uris']['normal']
    elsif card_res['card_faces']
      first_face = card_res['card_faces'].first
      second_face = card_res['card_faces'].second
      if first_face['image_uris']
        new_card.image_url = first_face['image_uris']['normal']
      else
        puts "Couldn't find an image_url for #{card_res['name']}"
      end
      if second_face['image_uris']
        new_card.back_image_url = second_face['image_uris']['normal']
      else
        puts "Couldn't find an image_url for #{card_res['name']}"
      end 
    else
      puts "Couldn't find an image_url for #{card_res['name']}"
    end
    new_card.multiverse_id = card_res['multiverse_ids'].first
    new_card.set = card_res['set']
    new_card.oracle_text = card_res['oracle_text']
    new_card.type_line = card_res['type_line']
    new_card.mana_cost = card_res['mana_cost']
    new_card.cmc = card_res['cmc']
    new_card.colors = card_res['color_identity']
    new_card.rarity = card_res['rarity']
    new_card.save! 
  end

  def discord_link
    domain = ENV["DOMAIN"] || "https://www.mtgleague.xyz"
    "[#{name}](#{domain}/cards/#{id})"  
  end

  def owned
    self.ownerships.count > 0
  end
end
