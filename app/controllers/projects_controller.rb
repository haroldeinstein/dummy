class ProjectsController < ApplicationController
  before_filter :login_required

  def show
    render json: Project.all.as_json
  end

  def update
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
    @project ||= director.projects.find(params[:project_id] || params[:project][:id])
  end
end
