# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick

  include CarrierWave::MimeTypes
  process :set_content_type

  storage :file

  def extension_white_list
    %w(jpg jpeg gif png)
  end

end
