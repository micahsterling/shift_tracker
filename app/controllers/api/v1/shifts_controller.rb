class Api::V1::ShiftsController < ApplicationController
  
  def index
    @shifts = Shift.where(organization_id: params[:organization_id]) 

    render 'index'
  end

  def create
    @shift = Shift.new(
      id: params[:id],
      user_id: params[:user_id],
      start: params[:start],
      end: params[:end],
      break_length: params[:break_length],
      organization_id: params[:organization_id]
    )

    if @shift.save
      render 'show.json.jb'
    else
      render json: {error: @shift.errors.messages}, status: 422
    end
  end
end
