class ApplicationController < ActionController::Base
  include Pundit::Authorization
  before_action :authenticate_user!, :set_users, :set_user_device
  protect_from_forgery

  def set_users
    @users = User.all
  end

  def set_user_device
    user_agent = request.user_agent
    @user_device = UserDevice.new user_agent
  end
end
