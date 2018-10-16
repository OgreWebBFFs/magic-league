class ApplicationController < ActionController::Base
  include Pundit
  before_action :authenticate_user!, :set_users
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery

  def set_users
    @users = User.all
  end

  protected

  def configure_permitted_parameters
    added_attrs = [:name, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end
