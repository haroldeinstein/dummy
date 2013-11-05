class Memoir < ActiveRecord::Base
  attr_accessible :caption, :image

  scope :published, -> { where("caption IS NOT NULL AND caption != ''").order("id DESC") }

  has_attached_file :image
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

