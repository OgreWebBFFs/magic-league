class DrafflesController < ApplicationController
  def create
    if no_active_draffles() 
      draffle = Draffle.create()
      redirect_to draffle_path(draffle)    
    else
      ## Alert is not working for some reason... fix later
      flash[:notice] = "Cannot create a new draffle while another is in progress"
      redirect_to draffles_path
    end
  end

  def show
    @draffle = Draffle.find_by_id(params[:id])
    @participants = @draffle.draffle_participants.order(:order).as_json(include: :user)
    @prizes = @draffle.draffle_prizes
    @board = @draffle.draft_board
  end

  def update
    draffle = Draffle.find_by_id(params[:id])
    draffle.draffle_participants.destroy_all
    draffle.draffle_prizes.destroy_all

    params[:participants].each { |participant|
      draffle.add_participant participant
    }
    params[:prizes].each { |prize| 
      draffle.add_prize prize
    }
    draffle.update(rounds: params[:rounds])
    draffle.update(snake: params[:snake])
    
    draffle.reload
    if draffle.is_ready
      draffle.update(status: 'ready')
    else
      draffle.update(status: 'invalid')
    end
  end
  
  def index
    @draffles = Draffle.order('updated_at DESC')
    @draffles = serialize_draffles(@draffles)
  end

  # status change methods
  def start
    draffle = Draffle.find_by_id(params[:id])
    if draffle.is_ready
      draffle.start
      render json: {status: 'success', draffle: "#{draffle.name} has begun!" }, :status => 200
    else
      render json: {status: 'error', invalid_draffle: "participants are 0 or more than prizes" }, :status => 400
    end
  end

  def pause
    draffle = Draffle.find_by_id(params[:id])
    draffle.update(status: 'paused')
    # # Do other things like pause autodraft timer
    render json: {status: 'success', draffle: "#{draffle.name} has been paused"}
  end

  # draffling methods
  def pick
    draffle = Draffle.find_by_id(params[:id])
    slot = draffle.pick params[:prize_id]
    render json: {status: 'success', message: "#{slot.participant.user.name} has successfully selected #{slot.prize.name}"}, :status => 200
  end

  def reset
    draffle = Draffle.find_by_id(params[:id])
    reset_pick = params[:pick].nil? ? 1 : params[:pick]
    draffle.reset reset_pick
  end

  private

  def serialize_draffles(draffles)
    draffles.map{ |draffle| 
      OpenStruct.new({
        name: draffle.name,
        date: draffle.updated_at.strftime("%a %b #{draffle.updated_at.day.ordinalize}"),
        id: draffle.id,
        status: draffle.status
      })
    }
  end

  def no_active_draffles
    Draffle.where.not(status: 'complete').length == 0
  end
end
