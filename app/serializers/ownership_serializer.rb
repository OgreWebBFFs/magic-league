class OwnershipSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :card_id, :keeper, :quantity

  attribute :user do |ownership|
    ownership.collection.user    
  end
end
