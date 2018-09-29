class ApplicationController < ActionController::Base
  before_action :authenticate_user!, :set_users
  def set_users
    @users = User.all
  end
end
