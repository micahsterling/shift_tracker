class OrganizationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :hourly_rate, :slug

  has_many :users
  has_many :shifts
end
