class RepLocation < ActiveRecord::Base
  attr_accessible :location

  has_many :reps

  def as_json(options={})
    serializable_hash(only: [
      'id',
      'location'
    ]).merge(
      reps: self.reps.as_json
    )
  end
end
