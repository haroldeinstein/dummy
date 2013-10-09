class AuthsController < ApplicationController

  def vimeo
    request.env['omniauth.auth']
    redirect_to '/admin'
  end

end
