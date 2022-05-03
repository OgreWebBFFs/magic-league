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
    @cards = @user.cards.order(:name)
    @count = @cards.count
    @tradables = @user.tradables
    @wishlist = @user.wishlist
    @current_user_wishlist = current_user.wishlist
    @trades = @user.trades.map { |trade| TradeSerializer.new(trade) }
  end


  private
  def set_user
    @user = User.find_by_id(params[:id])
  end

  def user_params
    params.require(:user).permit(policy(@user || User).permitted_attributes)
  end
end
