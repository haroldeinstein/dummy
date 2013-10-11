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
    @rep_locations = RepLocation.order("sort_index ASC").all
    @address = Address.last || Address.new
    @blanks = Array.new(8 - @rep_locations.length)
    @add_action = "new rep"
  end

  def memoir
    @memoir = Memoir.new
    @add_action = "new post"
  end

  def news
    @news = News.order("sort_index ASC")
    @has_auth = Auth.where(provider: "vimeo").count > 0
    @add_action = "show videos"
  end

  protected

  def memoirs
    @memoirs ||= Memoir.published.all
  end
  helper_method :memoirs

end
