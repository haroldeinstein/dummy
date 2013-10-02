require 'test_helper'

class NewsTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
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
#  wiredrive_id     :integer
#  sort_index       :integer          default(0)
#

