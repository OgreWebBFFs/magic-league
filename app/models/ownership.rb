class Ownership < ApplicationRecord
  belongs_to :collection
  belongs_to :card

  scope :from_params, -> (params) {
    where(card_id: params[:card_id]).where(collection_id: params[:collection_id])
  }

  def add
    self.quantity.increment!(1)  
  end

  def remove
    self.quantity.decrement!(1)
    if self.quantity == 0
        self.destroy
    end  
  end
end
