class ProjectsController < ApplicationController
  before_filter :login_required

  def show
    render json: Project.all.as_json
  end

  def create
    @project = Project.new(params[:project])
    if @project.save
      render json: @project.as_json
    else
    end
  end

  def update
    project.update_attributes(params[:project])
    render json: project.as_json
  end

  def destroy
    project.destroy
    render json: director.projects.as_json
  end

  def sort
    params[:p].each_with_index do |id, index|
      Project.update_all(['sort_index=?', index], ['id=? AND director_id=?', id, params[:director_id]])
    end

    head :no_content
  end

  private

  def director
    @director ||= Director.find(params[:director_id])
  end

  def project
    @project ||= director.projects.find(params[:project_id])
  end
end
