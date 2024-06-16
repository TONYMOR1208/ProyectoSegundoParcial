class UsuariosController < ApplicationController
  skip_before_action :verify_authenticity_token
  # Acción para crear un nuevo usuario
  def create
    usuario = Usuario.new(usuario_params)
    if usuario.save
      render json: { message: "Usuario creado exitosamente" }, status: :created
    else
      render json: { error: "Error al crear el usuario", details: usuario.errors }, status: :unprocessable_entity
    end
  end


  # Acción para mostrar todos los usuarios
  def index
    usuarios = Usuario.all
    render json: usuarios, status: :ok
  end

  # Acción para mostrar los detalles de un usuario específico
  def show
    usuario = Usuario.find_by(id: params[:id])
    if usuario
      render json: usuario, status: :ok
    else
      render json: { error: "No se pudo encontrar el usuario con el ID proporcionado" }, status: :not_found
    end
  end

  # Acción para actualizar la información de un usuario
  def update
    usuario = Usuario.find_by(id: params[:id])
    if usuario.update(usuario_params)
      render json: { message: "Información del usuario actualizada exitosamente" }, status: :ok
    else
      render json: { error: "Error al actualizar la información del usuario", details: usuario.errors }, status: :unprocessable_entity
    end
  end

  # Acción para eliminar un usuario
  def destroy
    usuario = Usuario.find_by(id: params[:id])
    if usuario
      usuario.destroy
      render json: { message: "Usuario eliminado correctamente" }, status: :ok
    else
      render json: { error: "No se pudo encontrar el usuario con el ID proporcionado" }, status: :not_found
    end
  end

  private

  # Método privado para definir los parámetros permitidos para crear o actualizar un usuario
  def usuario_params
    params.require(:usuario).permit(:nombre, :direccion, :telefono, :correo)
  end
end
