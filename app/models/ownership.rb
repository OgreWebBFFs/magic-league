class Ownership < ApplicationRecord
  belongs_to :collection
  belongs_to :card

  scope :from_params, -> (params) {
    where(card_id: params[:card_id]).where(collection_id: params[:collection_id])
  }

  scope :available, -> { where(keeper: false) }

  def add
    self.increment!(:quantity)  
  end

  def remove
    self.decrement!(:quantity)
    if self.quantity == 0
        self.destroy
    end  
  end
end
