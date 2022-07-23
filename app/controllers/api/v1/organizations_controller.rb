class Api::V1::OrganizationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @organizations = Organization.all

    render 'index'
  end

  def show
    @organization = Organization.find_by(id: params[:id])
    render 'show.'
  end
  
  # def create
  #   organization = Organization.new(organization_params)
    
  #   if organization.save
  #     render json: OrganizationSerializer.new(organization).serialized_json
  #   else
  #     render json: {error: organization.errors.messages}, status: 422
  #   end
  # end


  
  def update 
    @organization = Organization.find_by(id: params[:id])
    @organization.name = params[:name] || @organization.name
    @organization.hourly_rate = params[:hourly_rate] || @organization.hourly_rate

    if @organization.save
      render json: {message: "Org successfully updated!"}
    else
      render json: {error: organization.errors.messages}, status: 422
    end
  end


  private

    def organization_params
      params.require(:organization).permit(:name, :hourly_rate, :organization_id)
    end

    def options
      @options ||= {include: %i[shifts]}
    end
end
