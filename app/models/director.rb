class Director < ActiveRecord::Base
  validates :name, presence: true
  before_validation :generate_url

  scope :active, -> { where(active: true) }

  has_many :projects

  def to_param
    self.url
  end

  private

  def generate_url
    self.url = self.name.downcase.gsub(' ','-')
  end
end

# == Schema Information
#
# Table name: directors
#
#  id             :integer          not null, primary key
#  name           :string(255)
#  url            :string(255)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  vimeo_username :string(255)
#

