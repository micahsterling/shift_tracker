class Api::V1::OrganizationsController < ApplicationController
  # protect_from_forgery with: :null_session
  def index
    @organizations = Organization.all

    render 'index'
  end

  
  def create
    organization = Organization.new(organization_params)
    
    if organization.save
      render json: OrganizationSerializer.new(organization).serialized_json
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
      params.require(:organization).permit(:name, :hourly_rate, :organization_id)
    end

    def options
      @options ||= {include: %i[shifts]}
    end
end
