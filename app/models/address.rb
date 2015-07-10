class Address < ActiveRecord::Base
end

# == Schema Information
#
# Table name: addresses
#
#  id         :integer          not null, primary key
#  address1   :string(255)
#  address2   :string(255)
#  city       :string(255)
#  state      :string(255)
#  zip        :string(255)
#  phone      :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

