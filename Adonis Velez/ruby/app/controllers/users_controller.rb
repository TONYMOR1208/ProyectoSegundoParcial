class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_user, only: [:show, :destroy]


  # GET /users
  def index
    @user = User.all
    render json: @user, status: :ok
  end

  # GET /users/:id
  def show
    render json: @user, status: :ok
  end


  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
        render json: @user, status: :created
    else
        render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
