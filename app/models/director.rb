class Director < ActiveRecord::Base
  attr_accessible :name, :url

  validates :name, presence: true
  before_validation :generate_url

  def to_param
    self.url
  end

  private

  def generate_url
    self.url = self.name.downcase.gsub(' ','-')
  end
end
