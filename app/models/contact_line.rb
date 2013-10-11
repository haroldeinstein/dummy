class ContactLine < ActiveRecord::Base
  attr_accessible :line
end

# == Schema Information
#
# Table name: contact_lines
#
#  id         :integer          not null, primary key
#  line       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

