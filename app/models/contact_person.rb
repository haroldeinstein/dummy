class ContactPerson < ActiveRecord::Base
  # attr_accessible :email, :name, :title
end

# == Schema Information
#
# Table name: contact_people
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  email      :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  title      :string(255)
#

