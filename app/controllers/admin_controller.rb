class AdminController < ApplicationController
  before_filter :login_required

  layout "admin"

  def index
    @directors = Director.all
  end

  def director
    @director = Director.find_by_url(params[:director])
  end
end
