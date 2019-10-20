class Admin::UsersController < ApplicationController
  before_action :set_user, only: [:unlock]
  after_action :verify_authorized, only: [:unlock]

  respond_to :html, :js, :json

  def index
    @users = User.all.order(:email)
  end

  def lock
    user = User.find_by_id(params[:user_id])
    authorize user
    user.locked_at = Time.now
    user.save

    redirect_to admin_users_path
  end

  def unlock
    user = User.find_by_id(params[:user_id])
    authorize user
    user.locked_at = nil
    user.save

    redirect_to admin_users_path
  end

  private
  def set_user
    @user = User.find_by_id(params[:id])
  end

  def user_params
    params.require(:user).permit(policy(@user || User).permitted_attributes)
  end
end
