class RepLocation < ActiveRecord::Base
  attr_accessible :location, :sort_index

  has_many :reps, dependent: :destroy

  def as_json(options={})
    serializable_hash(only: [
      'id',
      'location'
    ]).merge(
      reps: self.reps.as_json
    )
  end
end

# == Schema Information
#
# Table name: rep_locations
#
#  id         :integer          not null, primary key
#  location   :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  sort_index :string(255)
#

