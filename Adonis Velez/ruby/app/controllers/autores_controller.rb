class AutoresController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Acción para crear una nueva devolución
  def create
    autor = Autor.new(autor_params)
    if autor.save
      render json: { message: "Autor creado exitosamente" }, status: :created
    else
      render json: { error: "Error al crear el autor", details: autor.errors }, status: :unprocessable_entity
    end
  end

  # Acción para mostrar todas las devoluciones
  def index
    autor = Autor.all
    render json: autor, status: :ok
  end

  # Acción para mostrar los detalles de una devolución específica
  def show
    autor = Autor.find_by(id: params[:id])
    if autor
      render json: autor, status: :ok
    else
      render json: { error: "No se pudo encontrar el autor con el ID proporcionado" }, status: :not_found
    end
  end

  # Acción para actualizar la información de una devolución
  def update
    autor = Autor.find_by(id: params[:id])
    if autor.update(autor_params)
      render json: { message: "Información del Autor actualizada exitosamente" }, status: :ok
    else
      render json: { error: "Error al actualizar la información del Autor", details: autor.errors }, status: :unprocessable_entity
    end
  end

  # Acción para eliminar una devolución
  def destroy
    autor = Autor.find_by(id: params[:id])
    if autor
      autor.destroy
      render json: { message: "Autor eliminado correctamente" }, status: :ok
    else
      render json: { error: "No se pudo encontrar el Autor con el ID proporcionado" }, status: :not_found
    end
  end

  private

  # Método privado para definir los parámetros permitidos para crear o actualizar una devolución
  def autor_params
    params.require(:autor).permit(:nombre, :bibliografia)
  end
end
