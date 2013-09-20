CarrierWave.configure do |config|
  config.fog_credentials = {
    provider:              'AWS',
    aws_access_key_id:     AWS_CONFIG["app_key"],
    aws_secret_access_key: AWS_CONFIG["app_secret"]
  }

  config.fog_directory = AWS_CONFIG["s3_bucket"]
end
