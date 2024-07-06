class CardSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :colors, :cmc, :id, :image_url, :oracle_text, :mana_cost,:rarity, :set, :type_line, :back_image_url

  attribute :users do |object|
    UserSerializer.new(object.users).serializable_hash
  end

  attribute :ownership_attr do |object, params|
    ownership = params[:current_user].ownerships.where('card_id = ?', object.id).first
    ownership.present? ? ownership.as_json : nil
  end

end
