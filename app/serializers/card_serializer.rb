class CardSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :id, :image_url

  attribute :users do |object|
    UserSerializer.new(object.users).serializable_hash
  end

  attribute :count_in_collection do |object, params|
    params[:current_user].cards.where('card_id = ?', object.id).count
  end

end
