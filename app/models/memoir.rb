class Memoir < ActiveRecord::Base

  scope :published, -> { where("caption IS NOT NULL AND caption != ''").order("id DESC") }

  has_attached_file :image,
    storage: :s3,
    s3_credentials: "#{Rails.root}/config/aws.yml",
    bucket: AWS_CONFIG["bucket"]

  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

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

