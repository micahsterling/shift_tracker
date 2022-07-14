class Api::V1::ShiftsController < ApplicationController
  # protect_from_forgery with: :null_session

  def index
    @shifts = Shift.all

    render 'index.json.jb'
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
