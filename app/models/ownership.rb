class Ownership < ApplicationRecord
  belongs_to :collection
  belongs_to :card

  scope :from_params, -> (params) {
    where(card_id: params[:card_id]).where(collection_id: params[:collection_id])
  }
end
