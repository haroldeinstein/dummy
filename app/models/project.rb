class Project < ActiveRecord::Base
  # attr_accessible :director_id, :title, :video_url, :thumbnail_small, :thumbnail_medium, :thumbnail_large, :vimeo_id, :sort_index, :created_at, :updated_at

  validate :director_id, presence: true
  validate :vimeo_id, uniqueness: true
end

# == Schema Information
#
# Table name: projects
#
#  id               :integer          not null, primary key
#  director_id      :integer
#  title            :string(255)
#  video_url        :string(255)
#  thumbnail_large  :string(255)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  vimeo_id         :integer
#  thumbnail_small  :string(255)
#  thumbnail_medium :string(255)
#  sort_index       :integer          default(0)
#

