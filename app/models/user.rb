class User < ApplicationRecord
  belongs_to :organization
  has_many :shifts
  # has_secure_password
  # validates :email, presence: true, uniqueness: true
end
