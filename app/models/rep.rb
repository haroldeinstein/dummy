class Rep < ActiveRecord::Base
  attr_accessible :name, :email_address, :rep_location_id

  def as_json(options={})
    serializable_hash(only: [
      "id",
      "email_address",
      "name"
    ])
  end
end
