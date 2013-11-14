class ApplicationController < ActionController::Base

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
end
