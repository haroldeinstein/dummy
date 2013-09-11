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
    project.name = params[:project_name]
    if project.save
    else
    end
  end

  def destroy
    project.destroy
    render json: director.projects.as_json
  end

  private

  def director
    @director ||= Director.find(params[:director_id])
  end

  def project
    @project ||= director.projects.find(params[:project_id])
  end
end
