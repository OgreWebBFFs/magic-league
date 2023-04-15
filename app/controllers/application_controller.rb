class ApplicationController < ActionController::Base
  include Pundit::Authorization
  before_action :authenticate_user!, :set_users
  protect_from_forgery

  def set_users
    @users = User.all
  end
end
