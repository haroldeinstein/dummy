class DirectorsController < ApplicationController
  def index
    unless director && director.active?
      return redirect_to root_url
    end

    @video_id = director.projects.order("sort_index").first.try(:vimeo_id)
    @video_id = Project.find(params[:vid]).vimeo_id if params[:vid].present?
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
