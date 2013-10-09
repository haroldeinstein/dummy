class Auth < ActiveRecord::Base
  attr_accessible :token, :verifier, :provider, :uid

  belongs_to :user
end
