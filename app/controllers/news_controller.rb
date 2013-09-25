class NewsController < ApplicationController

  def index
  end

  def news_entries
    render json: News.all.as_json
  end

  def show
    arr = []

    Feedzirra::Feed.add_common_feed_entry_element("media:thumbnail", :value => :url, :as => :thumbnail_large, :with => {:height => "720"})
    Feedzirra::Feed.add_common_feed_entry_element("media:thumbnail", :value => :url, :as => :thumbnail_medium, :with => {:height => "360"})
    Feedzirra::Feed.add_common_feed_entry_element("media:thumbnail", :value => :url, :as => :thumbnail_small, :with => {:height => "45"})
    Feedzirra::Feed.add_common_feed_entry_element("media:content", :value => :url, :as => :content)
    Feedzirra::Feed.add_common_feed_entry_element('media:credit', :as => "credit")

    feed = Feedzirra::Feed.fetch_and_parse("http://www.wdcdn.net/rss/presentation/library/client/einstein/id/6ec339069c4992c58105fbece54e6e30").entries.each do |entry|

      d = DateTime.parse(entry.published.to_s)
      id = "#{d.year}#{d.month}#{d.day}#{d.hour}#{d.minute}#{d.second}".to_i

      entry.content = entry.content.gsub('&#38;', '&')
      entry.thumbnail_large = entry.thumbnail_large.gsub('&#38;', '&')
      entry.thumbnail_medium = entry.thumbnail_medium.gsub('&#38;', '&')
      entry.thumbnail_small = entry.thumbnail_small.gsub('&#38;', '&')

      json = Hash.new
      json["id"] = id
      json["title"] = entry.title
      json["video_url"] =  entry.content
      json["thumbnail_large"] = entry.thumbnail_large
      json["thumbnail_medium"] = entry.thumbnail_medium
      json["thumbnail_small"] = entry.thumbnail_small

      arr << json
    end


    render json: arr.to_json
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
