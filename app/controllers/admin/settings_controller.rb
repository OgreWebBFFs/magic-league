class Admin::SettingsController < ApplicationController
  before_action :set_settings, only: [:edit, :update]
  before_action :authorize_settings, only: [:edit, :update]
  before_action :verify_authorized, only: [:edit, :update]

  def edit
  end

  def update
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
end
