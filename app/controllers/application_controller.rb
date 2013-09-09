class ApplicationController < ActionController::Base
  protect_from_forgery

  def login_required
    flash.now[:notice] = "You must be an admin to access this page."
  end
end
