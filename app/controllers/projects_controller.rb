class ProjectsController < ApplicationController
  before_filter :login_required

  def show
    render json: Project.all.as_json
  end

  def update
    return head :ok if current_user.username == "vimeo"

    (params[:projects] || []).each do |k, p|
      project = Project.find(p["id"]) if p["id"]
      project ||= Project.new
      if p["delete"]
        project.destroy
      else
        project.attributes = p
        project.save
      end
    end

    render json: director.projects.as_json
  end

  private

  def director
    @director ||= Director.find(params[:director_id])
  end

  def project
    @project ||= director.projects.find(params[:project_id] || params[:project][:id])
  end
end
