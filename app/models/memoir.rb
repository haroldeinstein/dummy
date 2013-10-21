class Memoir < ActiveRecord::Base
  attr_accessible :caption, :image
  mount_uploader :image, ImageUploader

  scope :published, -> { where("caption IS NOT NULL AND caption != ''").order("id DESC") }
end

# == Schema Information
#
# Table name: memoirs
#
#  id         :integer          not null, primary key
#  caption    :text
#  image      :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

