class Admin::SettingsController < ApplicationController
  before_action :set_settings, only: [:edit, :update]
  before_action :authorize_settings, only: [:edit, :update]
  before_action :verify_authorized, only: [:edit, :update]

  def edit
  end

  def update
    if @settings.update(setting_params)
      redirect_to admin_setting_edit_path(@settings) 
    else
      render :edit
    end
  end

  private
  def set_settings
    # only use setting with id = 1, this will get changed
    # to the League tenant's id if we go down that path
    @settings = Setting.find(1)
  end

  def authorize_settings
    authorize @settings
  end

  def setting_params
    params.require(:setting).permit(:season_start_date, :season_length, :base_trade_sets)
  end
end
