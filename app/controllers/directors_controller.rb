class DirectorsController < ApplicationController
  def index
  end

  def create
    @director = Director.new(params[:director])
    if @director.save
      render json: @director.as_json
    end
  end

  private

  def director
    @director ||= Director.find_by_url!(params[:director])
  end
  helper_method :director

  def projects
    director.projects.order('sort_index')
  end
  helper_method :projects
end
