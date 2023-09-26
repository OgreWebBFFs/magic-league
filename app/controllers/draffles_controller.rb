include DraffleImgHelper

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

  def start
    draffle = Draffle.find_by_id(params[:id])
    if draffle.is_ready
      draffle.update(status: 'started')
      build_prize_pool_img draffle.draffle_prizes
      render json: {status: 'success', draffle: "#{draffle.name} has begun!" }, :status => 200
    else
      render json: {status: 'error', invalid_draffle: "participants are 0 or more than prizes" }, :status => 400
    end
  end

  def pick
    draffle = Draffle.find_by_id(params[:id])
    prize = draffle.draffle_prizes.detect { |prize| prize.id == params[:prize_id]}
    picker = draffle.current_pick
    # if picker.user === current_user
      picker.make_pick prize
      draffle.reload
      update_prize_pool_img draffle.draffle_prizes
      render json: {status: 'success', message: "#{picker.user.name} has successfully selected #{prize.name}"}, :status => 200
    # else
    #   render json: {status: 'error', message: "You are not authorized to make a pick at this time. Either it is not your turn to pick or you are not elligible for this draffle."}, :status => 403
    # end
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

  def is_ready(draffle)
    draffle.draffle_participants.length > 0 &&
      draffle.draffle_prizes.length >= draffle.draffle_participants.length
  end
end
