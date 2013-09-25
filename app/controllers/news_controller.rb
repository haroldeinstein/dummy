class NewsController < ApplicationController

  def index
  end

  def news_entries
    render json: News.all.as_json
  end

  def show

    xml = RestClient.get "http://www.wdcdn.net/rss/presentation/library/client/einstein/id/6ec339069c4992c58105fbece54e6e30"
    json = Hash.from_xml(xml).to_json
    render json: json
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
