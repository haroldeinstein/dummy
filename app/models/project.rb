class Project < ActiveRecord::Base
  attr_accessible :director_id, :title, :video_url, :thumbnail_small, :thumbnail_medium, :thumbnail_large, :vimeo_id
end
