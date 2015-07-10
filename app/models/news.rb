class News < ActiveRecord::Base
  # attr_accessible :sort_index, :thumbnail_large, :thumbnail_medium, :thumbnail_small, :title, :video_url, :vimeo_id, :created_at, :updated_at
end

# == Schema Information
#
# Table name: news
#
#  id               :integer          not null, primary key
#  title            :string(255)
#  video_url        :string(255)
#  thumbnail_large  :string(255)
#  thumbnail_medium :string(255)
#  thumbnail_small  :string(255)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  vimeo_id         :integer
#  sort_index       :integer          default(0)
#

