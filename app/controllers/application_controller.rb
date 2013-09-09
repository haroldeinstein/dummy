class ApplicationController < ActionController::Base
  before_filter :authenticate

  protect_from_forgery

  def login_required
    unless current_user
      flash[:notice] = "You must be an admin to access that page."
      redirect_to '/admin/login'
    end
  end

  def login(user)
    session[:user_id] = user.id
    redirect_to '/admin'
  end

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def authenticate
    if Rails.env.production?
      authenticate_or_request_with_http_basic do |username, password|
        username == "dummyfilms" && password == "harold"
      end
    end
  end
end
