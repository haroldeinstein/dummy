class Address < ActiveRecord::Base
  attr_accessible :address1, :address2, :city, :phone, :state, :zip
end
