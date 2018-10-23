class TradablesController < JSONApplicationController
  before_action :set_tradable, only: [:destroy]
  def create
    render json: Tradable.create(user_id: current_user.id, card_id: params[:card][:id])
  end
  def destroy
    authorize(@tradable)
    if @tradable.destroy
      render json: @tradable
    else
      render json: @tradable.errors.messages, status: 403
    end
  end

  private

  def set_tradable
    @tradable = Tradable.find(params[:id])
  end

  def tradable_params
    params.permit(:id, card: [:id])
  end

end
