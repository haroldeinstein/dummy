# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWaveDirect::Uploader
  include CarrierWave::RMagick

  include CarrierWave::MimeTypes
  process :set_content_type

  storage :fog

  version :thumb do
    process resize_to_limit: [50, 50]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

end
