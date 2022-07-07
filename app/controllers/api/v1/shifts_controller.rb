class Api::V1::ShiftsController < ApplicationController
  def create
    shift = Shift.new(shift_params)

    if shift.save
      render json: ShiftSerializer.new(shift).serialization_json
    else
      render json: {error: shift.errors.messages}, status 422
  end

  private

  
  def shift_params
    params.require(:shift).permit(:user_id, :start, :end, :organization_id)
  end
end
