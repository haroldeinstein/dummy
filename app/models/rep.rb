class Rep < ActiveRecord::Base
  attr_accessible :name, :rep_location_id

  def as_json(options={})
    serializable_hash(only: [
      "email_address",
      "name"
    ])
  end
end
