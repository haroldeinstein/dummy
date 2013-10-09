class User < ActiveRecord::Base
  has_secure_password

  attr_accessible :password_digest, :username, :password, :password_confirmation

  has_many :auths
end

# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)
#  password_digest :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

