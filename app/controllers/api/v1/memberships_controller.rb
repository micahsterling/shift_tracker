class Api::V1::MembershipsController < ApplicationController
  skip_before_action :verify_authenticity_token

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
      render 'show'
    else
      render json: {error: @membership.errors.messages}, status: 422
    end
  end

  def destroy
    @membership = Membership.find_by(id: params[:id])
    # @membership.destroy
    render json: {message: "Membership successfully destroyed!"}
  end
end
