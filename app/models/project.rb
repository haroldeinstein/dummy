class Project < ActiveRecord::Base
  attr_accessible :director_id, :name, :poster_image_url, :video_url
end
