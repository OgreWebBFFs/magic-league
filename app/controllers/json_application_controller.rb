class JsonApplicationController < ApplicationController
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  
  private 

  def user_not_authorized(exception)
    policy_name = exception.policy.class.to_s.underscore
    message = t "#{policy_name}.#{exception.query}", scope: "pundit", default: :default
    render json: message, status: 403
  end

end
