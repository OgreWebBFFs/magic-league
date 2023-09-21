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
