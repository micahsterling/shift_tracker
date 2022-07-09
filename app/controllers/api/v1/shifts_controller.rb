class Api::V1::ShiftsController < ApplicationController

  def index
    @shifts = Shift.all

    render 'index.json.jb'
  end

  def create
    shift = Shift.new(shift_params)

    if shift.save
      render json: ShiftSerializer.new(shift).serialization_json
    else
      render json: {error: shift.errors.messages}, status: 422
    end
  end


  private

  
    def shift_params
      params.require(:shift).permit(:user_id, :start, :end, :organization_id)
    end

    def options
      @options ||= {include: %i[user]}
    end
end
