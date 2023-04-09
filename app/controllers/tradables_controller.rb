class TradablesController < JsonApplicationController
  before_action :set_tradable, only: [:destroy]
  before_action :set_user, only: [:show, :update]
  def index
  
  end

  def show
    respond_to do |format|
      format.html
      format.json {render json: @user.tradable, status: 200}
      end
  end
 
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
  def set_user
    @user = User.find(params[:id])
  end


  def set_tradable
    @tradable = Tradable.find(params[:id])
  end

  def tradable_params
    params.permit(:id, card: [:id])
  end

end
