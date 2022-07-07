class ShiftSerializer
  include FastJsonapi::ObjectSerializer
  attributes :start, :end, :break_length, :organization_id, :user_id

  # belongs_to :user
end
