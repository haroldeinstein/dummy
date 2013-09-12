class RepLocation < ActiveRecord::Base
  attr_accessible :location

  has_many :reps
end
