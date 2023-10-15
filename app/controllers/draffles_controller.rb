
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
    @board = @draffle.board
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
    draffle.update(name: params[:name])
    draffle.update(welcome: params[:welcome])
    
    draffle.reload
    if draffle.ready?
      draffle.update(status: 'valid')
    else
      draffle.update(status: 'invalid')
    end
    render json: {}
  end
  
  def index
    @draffles = Draffle.order('updated_at DESC')
    @draffles = serialize_draffles(@draffles)
  end

  # status change methods
  def start
    draffle = Draffle.find_by_id(params[:id])
    if !draffle.ready?
      render json: {status: 'error', invalid_draffle: "participants are 0 or more than prizes" }, :status => 400
      return
    end
    draffle.start
    render json: {status: 'success', draffle: "#{draffle.name} has begun!" }, :status => 200
  end

  def pause
    draffle = Draffle.find_by_id(params[:id])
    draffle.pause
    render json: {status: 'success', draffle: "#{draffle.name} has been paused"}
  end

  def complete
    draffle = Draffle.find_by_id(params[:id])
    
    if !draffle.pending?
      render json: {status: 'error', message: "#{draffle.name} is in a(n) #{draffle.status} state. Draffle must be in a 'pending' state to validate results"}, :status => 401
      return
    end

    draffle.update(status: 'completed')
    render json: {status: 'success', message: "#{draffle.name} has been completed!"}
  end

  # draffling methods
  def pick
    draffle = Draffle.find_by_id(params[:id])
    
    if !draffle.running?
      render json: {status: 'error', message: "#{draffle.name} is in a(n) #{draffle.status} state. Draffle must be in a 'started' state to make picks"}, :status => 401
      return
    end

    if !current_user.admin?
      render json: {status: 'error', message: "only admins are allowed to make picks via api"}, status: 403
      return
    end
    puts "\n\n\n"
    puts params
    puts "\n\n\n"
    if !draffle.prize_available? params[:prize_id]
      render json: {status: 'error', message: "That card is not available. Please choose another"}, status: 401
      return
    end
    
    slot = draffle.pick params[:prize_id]
    render json: {status: 'success', message: "#{slot.participant.user.name} has successfully selected #{slot.prize.name}"}, :status => 200
  end

  def reset
    draffle = Draffle.find_by_id(params[:id])
    
    if !(draffle.paused? || draffle.pending?)
      render json: {status: 'error', message: "#{draffle.name} is in a(n) #{draffle.status} state. Draffle must be in a 'paused' or 'pending' state to reset picks"}
      return
    end

    if params[:pick].nil?
      reset_pick = 0
      msg = "has been completely resest"
    else
      reset_pick = params[:pick]
      msg = "has been reset to pick #{reset_pick}"
    end

    draffle.reset reset_pick
    render json: {status: 'succes', message: "#{draffle.name} #{msg}. #{draffle.board.get_slot(reset_pick).user.name} is now picking"}, :status => 200
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
    Draffle.where.not(status: 'completed').length == 0
  end
end
