class Api::V1::MembershipsController < ApplicationController

  def index
    @memberships = Membership.where(user_id: params[:user_id]) 

    render 'index.json.jb'
  end
end
