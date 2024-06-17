class ApplicationController < ActionController::Base
  def authorize_request
    unless request.headers["Authorization"].present?
      render json: { error: "No autorizado" }, status: :unauthorized
      return
    end
    token = request.headers["Authorization"].split(" ").last

    unless velid_token?(token)
      render json: { error: "Token inválido" }, status: :unauthorized
    end
  end

  def velid_token?(token)
    token == "SkFabTZibXE1aE14ckpQUUxHc2dnQ2RzdlFRTTM2NFE2cGI4d3RQNjZmdEFITmdBQkE="
  end
end
