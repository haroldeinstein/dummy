require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
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

