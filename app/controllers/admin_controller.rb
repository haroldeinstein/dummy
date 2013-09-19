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
    @add_action = "show videos"
  end

  def contact
    @rep_locations = RepLocation.all
    @blanks = Array.new(8 - @rep_locations.length)
    @add_action = "new rep"
  end

  def memoir
    @memoir = Memoir.new
    @add_action = "new post"
  end

  protected

  def memoirs
    @memoirs || Memoir.all
  end
  helper_method :memoirs

end
