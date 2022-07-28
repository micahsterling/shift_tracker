class Organization < ApplicationRecord
  has_many :users
  has_many :shifts
  has_many :memberships
  validates :name, presence: true, uniqueness: { case_sensitive: false }

  before_save :slugify
  
  def slugify
    self.slug = name.gsub(/[']/,'').parameterize
  end

end
