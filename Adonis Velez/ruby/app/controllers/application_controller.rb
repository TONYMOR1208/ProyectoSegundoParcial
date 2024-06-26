class ApplicationController < ActionController::Base
  include JsonWebToken
  before_action :authenticate_request

  private

  def authenticate_request
    header = request.headers['Authorization']
    unless header.present?
      render json: { error: "No autorizado. Token de autorización no proporcionado." }, status: :unauthorized
      return
    end

    token = header.split(' ').last

    begin
      decoded = jwt_decode(token)
      @current_user = User.find(decoded[:user_id])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: { error: "No autorizado. Token inválido o usuario no encontrado." }, status: :unauthorized
    end
  end

  def jwt_decode(token)
    decoded = JWT.decode(token, JsonWebToken::SECRET_KEY)[0]
    HashWithIndifferentAccess.new(decoded)
  end
end
