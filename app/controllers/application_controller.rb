class ApplicationController < ActionController::Base
  include Pundit::Authorization
  before_action :authenticate_user!, :set_users, :set_device
  protect_from_forgery

  def set_users
    @users = User.all
  end

  private

  def set_device
    user_agent = request.user_agent
    detector = DeviceDetector.new(user_agent)
    mobile_device_types = [
        'smartphone',
        'table',
        'feature phone'
    ]

    @device_type = if mobile_device_types.include?(detector.device_type)
                     'mobile'
                   else
                     'desktop'
                   end  
  end
end
