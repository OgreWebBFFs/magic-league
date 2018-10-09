class OwnershipSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :card_id 
end
