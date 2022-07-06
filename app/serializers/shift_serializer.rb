class ShiftSerializer
  include FastJsonapi::ObjectSerializer
  attributes :start, :end, :break_length
end
