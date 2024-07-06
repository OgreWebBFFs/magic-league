class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update]
  after_action :verify_authorized, only: [:edit, :update]

  respond_to :html, :js, :json

  def index
    @users = User.all
  end

  def edit
    authorize @user
  end

  def update
    authorize @user
    @user.update(user_params)

    respond_with @user
  end


  def show
    @ownerships = @user.collection.ownerships.includes(:card).as_json(include: :card)
    @count = @ownerships.count
    @tradables = @user.tradables
    @wishlist = @user.wishlist
    @current_user_wishlist = current_user.wishlist
    @active_objectives = current_user.user_objectives.select{ |obj|
      current_user.id == @user.id && obj.completed_at == nil && obj.assigned_at != nil
    }.map{ |obj| UserObjectiveSerializer.new(obj)}
    @completed_objectives = @user.user_objectives.select{ |obj|
      obj.completed_at != nil
    }.map{ |obj| UserObjectiveSerializer.new(obj)}
    @objective_rerolls = @user.reroll
    @trades = @user.trades

    event_matches = Match.where(event_id: 1)
    @event_ranking = EventRankingEngine.new().generate_event_user_ranking(@user)
  end


  private
  def set_user
    @user = User.find_by_id(params[:id])
  end

  def user_params
    params.require(:user).permit(policy(@user || User).permitted_attributes)
  end
end
