class AdminController < ApplicationController
  before_filter :login_required

  layout "admin"

  def index
    @editable = "false"
    @directors = Director.all
  end

  def director
    @director = Director.find_by_url(params[:director])
    @projects = @director.projects.order("sort_index ASC")
  end

  def contact
    @rep_locations = RepLocation.all
    @blanks = Array.new(8 - @rep_locations.length)
  end
end
