class CollectionsController < ApplicationController
  before_action :set_collection, only: [:show, :edit, :update]
  after_action :verify_authorized, only: [:edit, :update]

  def index
    @collections = Collection.all.joins(:user)
  end

  def show
    @cards = @collection.cards.order(:name)

    options = {params: {current_user: current_user}}
    respond_to do |format|
      format.html
      format.js { render json: CardSerializer.new(@cards.uniq, options).serialized_json }
    end
  end

  def update
    authorize(@collection)
    results = OwnershipManager.new(collection_params[:ownership]).update_ownerships
    if results.all?
      render json: {count: results.count}
    else
      render json: {}, status: 500
    end
  end

  def edit
    authorize(@collection)
    @cards = @collection.cards.group(:id).count
  end

  private

  def set_collection
    @collection = Collection.find(params[:id])
  end

  def collection_params
    params.permit(:id, ownership: [ :count, :card_id, :collection_id ])
  end

end
