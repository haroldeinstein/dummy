class ProjectsController < ApplicationController

  def show
    render json: director.projects.all.as_json
  end

  def update
    (params[:projects] || []).each do |k, p|
      proj = Project.find_by_id(p["id"]) if p["id"]
      proj ||= director.projects.build
      if p["delete"]
        proj.destroy
      else
        p.permit!
        proj.attributes = p
        proj.save
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
