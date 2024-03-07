class AdvancedSearchController < ApplicationController
  def index
    @card_types = ["Artifact","Battle","Creature","Enchantment","Instant","Land","Planeswalker","Sorcery"]
    @sub_types = Card.all.pluck(:type_line).join(' ').gsub(/—|\/\/|Basic\s?(Plains|Island|Swamp|Mountain|Forest)?|Legendary/, '').split.uniq.reject{ |x| @card_types.include?(x) }.sort
    @sets = Card.all.pluck(:set).uniq
  end
end

