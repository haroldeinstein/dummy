class NewsController < ApplicationController

  def index
    @video_id = News.order("sort_index").first.try(:vimeo_id)
    @video_id = News.find(params[:vid]).vimeo_id if params[:vid].present?
  end

  def news_entries
    render json: News.all.as_json
  end

  def show
    # xml = RestClient.get "http://www.wdcdn.net/rss/presentation/library/client/einstein/id/6ec339069c4992c58105fbece54e6e30"
    # json = Hash.from_xml(xml).to_json
    auth = Auth.last
    album = Vimeo::Advanced::Album.new(VIMEO_CONFIG["key"], VIMEO_CONFIG["secret"], :token => auth.token, :secret => auth.verifier)
    videos = album.get_videos("2561992", { :page => "1", :per_page => "100", :full_response => "0", :password => "scooter" })["videos"]
    # ids = videos["video"].map(&:id)
    ids = []
    @videos = []
    videos["video"].each { |v| ids << v["id"] }
    ids.each do |id|
      video = Vimeo::Advanced::Video.new(VIMEO_CONFIG["key"], VIMEO_CONFIG["secret"], :token => auth.token, :secret => auth.verifier)
      @videos << video.get_info(id)["video"]
    end

    render json: @videos
  end

  def update

    (params[:news] || []).each do |k, n|
      news = News.find(n["id"]) if n["id"]
      news ||= News.new
      if n["delete"]
        news.destroy
      else
        news.attributes = n
        news.save
      end
    end

    render json: News.all.as_json
  end

  protected

  def news
    @news ||= News.order("sort_index").all
  end
  helper_method :news

end
