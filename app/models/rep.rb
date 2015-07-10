class Rep < ActiveRecord::Base
  # attr_accessible :name, :email_address, :rep_location_id

  def as_json(options={})
    serializable_hash(only: [
      "id",
      "email_address",
      "name"
    ])
  end
end

# == Schema Information
#
# Table name: reps
#
#  id              :integer          not null, primary key
#  rep_location_id :integer
#  name            :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  email_address   :string(255)
#

