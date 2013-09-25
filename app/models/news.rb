class News < ActiveRecord::Base
  attr_accessible :sort_index, :thumbnail_large, :thumbnail_medium, :thumbnail_small, :title, :video_url, :wiredrive_id, :created_at, :updated_at
end
