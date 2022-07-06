class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :organization_id

  has_many :shifts
end
