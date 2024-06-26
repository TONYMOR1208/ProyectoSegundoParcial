class AuthenticationController < ApplicationController
  include JsonWebToken

  skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_request, only: [:login, :register]

  # POST /auth/login
  def login
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      token = jwt_encode({user_id: @user.id})
      render json: {token: token}, status: :ok
    else
      render json: {error: 'usuario o contraseña invalido'}, status: :unauthorized
    end
  end

  # POST /auth/register
  def register
    @user = User.new(user_params)
    if @user.save
      render json: {message: 'Usuario creado con éxito'}, status: :created
    else
      render json: {error: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:email, :username, :password, :password_confirmation)
  end

end
