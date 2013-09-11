class DirectorsController < ApplicationController
  def index
  end

  private

  def director
    @director ||= Director.find_by_url!(params[:director])
  end
  helper_method :director

  def projects
    director.projects
  end
  helper_method :projects
end
