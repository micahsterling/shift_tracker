class Organization < ApplicationRecord
  has_many :users
  has_many :shifts

  before_create :slugify
  
  def slugify
    self.slug = name.parameterize
  end

end
