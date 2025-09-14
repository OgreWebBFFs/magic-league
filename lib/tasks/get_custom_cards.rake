def format_mana_string(raw)
  return "" if raw.nil?

  raw
    .scan(/\{[^}]*\}|[A-Z0-9\/]+/)  # captures full symbols or letters
    .flat_map { |chunk| chunk.gsub(/[^A-Z0-9\/]/, '').chars.chunk_while { |a, b| b.match?(/[\/0-9]/) }.map(&:join) }
    .map { |sym| "{#{sym}}" }
    .join
end

def card_image_url(card_name)
  slug = card_name.to_s.downcase
    .gsub(/\s+/, '_')
    .gsub(/[^a-z0-9\-_]/, '')
  "/card_images/#{slug}.png"
end

namespace :cards do
  desc "Import custom cards from Cockatrice XML file"
  task import_customs: :environment do
    require 'nokogiri'

    xml_path = Rails.root.join('lib', 'data', 'custom_cards.xml')

    unless File.exists?(xml_path)
      puts "File Not Found: #{xml_path}"
      exit 1
    end

    doc = Nokogiri::XML(File.read(xml_path))

    doc.xpath('//card').each do |card_node|
      name       = card_node.xpath('name')&.text
      set_node   = card_node.at_xpath('set')
      set        = set_node&.text
      rarity     = set_node&.attr('rarity')
      colors     = format_mana_string card_node.at_xpath('prop/colors')&.text.to_s.strip
      mana_cost  = format_mana_string card_node.at_xpath('prop/manacost')&.text.to_s.strip
      cmc        = card_node.at_xpath('prop/cmc')&.text&.to_i
      type_line  = card_node.at_xpath('prop/type')&.text
      pt         = card_node.at_xpath('prop/pt')&.text
      text       = card_node.at_xpath('text')&.text

      card = Card.find_or_create_by(name: name)
      card.set = set
      card.rarity = rarity
      card.colors = colors
      card.mana_cost = mana_cost
      card.cmc = cmc
      card.type_line = type_line
      card.oracle_text = text
      card.image_url = card_image_url name
      card.scryfall_id = SecureRandom.uuid
      card.save!
    end
  end
end