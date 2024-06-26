class GenerosController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Acción para crear un nuevo género
  def create
    genero = Genero.new(genero_params)
    if genero.save
      render json: { message: "Género creado exitosamente" }, status: :created
    else
      render json: { error: "Error al crear el género", details: genero.errors }, status: :unprocessable_entity
    end
  end

  # Acción para mostrar todos los géneros
  def index
    generos = Genero.all
    render json: generos, status: :ok
  end

  # Acción para mostrar los detalles de un género específico
  def show
    genero = Genero.find_by(id: params[:id])
    if genero
      render json: genero, status: :ok
    else
      render json: { error: "No se pudo encontrar el género con el ID proporcionado" }, status: :not_found
    end
  end

  # Acción para actualizar la información de un género
  def update
    genero = Genero.find_by(id: params[:id])
    if genero.update(genero_params)
      render json: { message: "Información del género actualizada exitosamente" }, status: :ok
    else
      render json: { error: "Error al actualizar la información del género", details: genero.errors }, status: :unprocessable_entity
    end
  end

  # Acción para eliminar un género
  def destroy
    genero = Genero.find_by(id: params[:id])
    if genero
      genero.destroy
      render json: { message: "Género eliminado correctamente" }, status: :ok
    else
      render json: { error: "No se pudo encontrar el género con el ID proporcionado" }, status: :not_found
    end
  end

  private

  # Método privado para definir los parámetros permitidos para crear o actualizar un género
  def genero_params
    params.require(:genero).permit(:nombre)
  end
end
