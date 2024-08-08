class CardSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :colors, :cmc, :id, :image_url, :oracle_text, :mana_cost,:rarity, :set, :type_line, :back_image_url

  attribute :ownerships do |object|
    User
      .includes(:ownerships)
      .joins(:ownerships)
      .where(ownerships: { card_id: object.id })
      .select('users.id AS user_id, users.name AS user_name, ownerships.keeper AS keeper, ownerships.quantity as quantity')
  end
end
