class ProjectsController < ApplicationController
  def show
    render json: Project.all.as_json
  end

  def update
    # return head :ok if current_user.username == "vimeo"

    (params[:projects] || []).each do |k, p|
      proj = Project.find(p["id"]) if p["id"]
      proj ||= Project.new
      if p["delete"]
        proj.destroy
      else
        proj.attributes = p
        proj.save
      end
    end

    render json: director.projects.as_json
  end

  def vimeo
    auth = Auth.last
    vid = Vimeo::Advanced::Video.new(VIMEO_CONFIG["key"], VIMEO_CONFIG["secret"], :token => auth.token, :secret => auth.verifier)
    videos = vid.get_all("14797309", { :page => "1", :per_page => "50", :full_response => "0", :sort => "newest" })
    ids = []
    @videos = []
    videos["videos"]["video"].each { |v| ids << v["id"] }
    ids.each do |id|
      video = Vimeo::Advanced::Video.new(VIMEO_CONFIG["key"], VIMEO_CONFIG["secret"], :token => auth.token, :secret => auth.verifier)
      @videos << video.get_info(id)["video"]
    end

    render json: @videos
  end

  private

  def director
    @director ||= Director.find(params[:director_id])
  end

  def project
    @project ||= director.projects.find(params[:project_id] || params[:project][:id])
  end
end
