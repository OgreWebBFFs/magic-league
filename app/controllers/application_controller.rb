class ApplicationController < ActionController::Base
  include Pundit::Authorization
  before_action :authenticate_user!, :set_users, :set_notifications
  protect_from_forgery

  def set_users
    @users = User.all
  end

  def set_notifications
    new_announcement_date_time = Rails.cache.read('new_announcement')
    last_viewed_announcements_date_time = cookies[:announcements_viewed]
    new_announcement_notification = new_announcement_date_time && (!last_viewed_announcements_date_time || new_announcement_date_time > last_viewed_announcements_date_time)
    @notifications = { new_announcement: new_announcement_notification, pending_trade_offer:  current_user.has_pending_trade_offer? }
  end
end
