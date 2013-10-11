class Auth < ActiveRecord::Base
  attr_accessible :token, :verifier, :provider, :uid

  belongs_to :user
end

# == Schema Information
#
# Table name: auths
#
#  id         :integer          not null, primary key
#  provider   :string(255)
#  uid        :string(255)
#  token      :string(255)
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  verifier   :string(255)
#

