class CollectionsController < ApplicationController
  before_action :set_collection, only: [:show, :edit, :update, :bulk_edit, :bulk_update]
  before_action :set_user, only: [:show, :update]
  after_action :verify_authorized, only: [:edit, :update]

  def index
    @collections = Collection.all.joins(:user)
  end

  def show
    @cards = @collection.cards.order(:name)

    options = {params: {current_user: current_user}}
    render json: CardSerializer.new(@cards.uniq, options).serialized_json
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

  def bulk_edit
    authorize(@collection)

    if !params['alerts'].blank?
      @card_list = params['collection']['card_list']
    else
      @card_list = @collection.to_s
    end
  end

  def bulk_update
    authorize(@collection)
    
    cards = @collection.cards
    errors = CardImporter.new(collection_params).save_cards

    if errors.blank?
      redirect_to @collection.user
    else
      redirect_to bulk_edit_collection_path(@collection, params: collection_params, alerts: errors)
    end
  end

  private

  def set_collection
    @collection = Collection.find(params[:id])
  end

  def set_user
    @user = User.find(params[:id])
  end

  def collection_params
    params.permit(:id, :alerts, ownership: [ :count, :card_id, :collection_id ], collection: [:card_list])
  end

end
