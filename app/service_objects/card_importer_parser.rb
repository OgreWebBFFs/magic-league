class CardImporterParser
  REGEX = /^((\d+)?x?\s*)?(.*?)(?:\s*\(([a-zA-Z\d]{3})\))?$/
  COUNT = 2
  CARD_NAME = 3
  SET = 4

  def initialize(params)
    @card_list = params
  end

  def parse
    parsed_cards = []
    @card_list.lines.each do |line|
      match = REGEX.match(line.strip)
      if match
        card_name = match[CARD_NAME].strip
        card_count = match[COUNT].nil? ? 1 : match[COUNT].to_i
        card_set = match[SET] || ""

        already_parsed = parsed_cards.find { |card| card.name == card_name.downcase }

        if already_parsed.nil?
          parsed_cards << RawImportedCard.new(name: card_name, set: card_set, count: card_count)
        else
          already_parsed.add card_count
        end
      end
    end
    parsed_cards
  end
end

class RawImportedCard
  attr_reader :name, :set, :count

  def initialize(params)
    @name = params[:name].downcase
    @set = params[:set].downcase
    @count = params[:count]
  end

  def add num
    @count += num
  end

  def has_set
    !@set.blank?
  end
end