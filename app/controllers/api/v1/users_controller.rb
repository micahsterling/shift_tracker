class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    user = User.new(
      name: params[:name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
    )
    if user.save
      render json: { message: "User created successfully" }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end
  
  # def reset
  #   @user = User.find(params[:id])
  #   @user.password = "password"
  #   @user.password_confirmation = "password"
  #   if @user.save
  #     redirect_to users_url, notice: "Password was successfully reset!"
  #   else
  #     redirect_to users_url, notice: "Password reset failed"
  #   end
  # end
end
