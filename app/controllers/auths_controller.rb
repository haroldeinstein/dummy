class AuthsController < ApplicationController

  def create
    base = Vimeo::Advanced::Base.new(VIMEO_CONFIG["key"], VIMEO_CONFIG["secret"])
    request_token = base.get_request_token
    session[:oauth_secret] = request_token.secret
    redirect_to base.authorize_url
  end

  def vimeo
    base = Vimeo::Advanced::Base.new(VIMEO_CONFIG["key"], VIMEO_CONFIG["secret"])
    access_token = base.get_access_token(params[:oauth_token], session[:oauth_secret], params[:oauth_verifier])
    # You'll want to hold on to the user's access token and secret. I'll save it to the database.
    Auth.create(token: access_token.token, verifier: access_token.secret, provider: "vimeo")
    redirect_to '/admin'
  end

end
