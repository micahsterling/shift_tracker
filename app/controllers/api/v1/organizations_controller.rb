class Api::V1::OrganizationsController < ApplicationController
  def index
    organizations = Organization.all

    render json: OrganizationSerializer.new(organizations, options).serialized_json
  end

  def show
    organization = Organization.find_by(slug: params[:slug])

    render json: OrganizationSerializer.new(organization, options).serialized_json
  end

  
  def create
    organization = Organization.new(organization_params)
    
    if organization.save
      render json: OrganizationSerializer.new(organization).serialized_jsonn
    else
      render json: {error: organization.errors.messages}, status: 422
    end
  end
  
  def update 
    organization = Organization.find_by(slug: params[:slug])

    if organization.update(organization_params)
      render json: OrganizationSerializer.new(organization, options).serialized_json
    else
      render json: {error: organization.errors.messages}, status: 422
    end
  end

  def destroy
    organization = Organization.find_by(slug: params[:slug])

    if organization.destroy
      head :no_content
    else
      render json: {error: organization.errors.message}, status: 422
    end
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :hourly_rate)
    end

    def options
      @options ||= {include: %i[shifts]}
    end
end
