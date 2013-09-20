AWS_CONFIG = YAML.load_file("#{Rails.root}/config/aws.yml")[Rails.env]
AWS_CONFIG = YAML.load_file("#{Rails.root}/config/instagram.yml")[Rails.env]
