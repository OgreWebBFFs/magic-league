class AdvancedBrowseController < ApplicationController
  def index
    @card_types = ["Artifact","Battle","Creature","Enchantment","Instant","Land","Planeswalker","Sorcery"]
    @types = Card.all.pluck(:type_line).join(' ').gsub(/—|\/\//, '').split.uniq.reject{ |x| @card_types.include?(x) }.sort
  end
end

