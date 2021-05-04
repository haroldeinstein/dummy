class Memoir < ActiveRecord::Base
  scope :published, -> { where("caption IS NOT NULL AND caption != ''").order("id DESC") }

  has_one_attached :image

  def as_json(opts={})
    serializable_hash(:only => [
      :id,
      :caption
    ]).merge({
      "image" => image.try(:url)
    })
  end
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

