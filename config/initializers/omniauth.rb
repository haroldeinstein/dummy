Rails.application.config.middleware.use OmniAuth::Builder do
  provider :vimeo, VIMEO_CONFIG['key'], VIMEO_CONFIG['secret']
end
