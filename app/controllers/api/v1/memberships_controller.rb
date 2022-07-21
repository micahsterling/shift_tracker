class Api::V1::MembershipsController < ApplicationController

  def index
    @memberships = Membership.where(user_id: params[:user_id]) 

    render 'index'
  end

  def create 
    @membership = Membership.new(
      user_id: params[:user_id],
      organization_id: params[:organization_id]
    )
    if @membership.save
      render 'show.json.jb'
    else
      render json: {error: @membership.errors.messages}, status: 422
    end
  end
end
