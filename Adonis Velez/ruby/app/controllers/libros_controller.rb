class LibrosController < ApplicationController
  before_action :authorize_request, only: [:create, :index, :show, :update, :destroy]

  # Acción para crear un nuevo libro
  def create
    libro = Libro.new(libro_params)
    if libro.save
      render json: { message: "Libro creado exitosamente" }, status: :created
    else
      render json: { error: "Error al crear el libro", details: libro.errors }, status: :unprocessable_entity
    end
  end

  # Acción para mostrar todos los libros disponibles
  def index
    libro = Libro.all
    render json: libro, status: :ok
  end

  # Acción para mostrar los detalles de un libro específico
  def show
    libro = Libro.find_by(id: params[:id])
    if libro
      render json: libro, status: :ok
    else
      render json: { error: "No se pudo encontrar el libro con el ID proporcionado" }, status: :not_found
    end
  end

  # Acción para actualizar la información de un libro
  def update
    libro = Libro.find_by(id: params[:id])
    if libro.update(libro_params)
      render json: { message: "Información del libro actualizada exitosamente" }, status: :ok
    else
      render json: { error: "Error al actualizar la información del libro", details: libro.errors }, status: :unprocessable_entity
    end
  end

  # Acción para eliminar un libro
  def destroy
    libro = Libro.find_by(id: params[:id])
    if libro
      libro.destroy
      render json: { message: "Libro eliminado correctamente" }, status: :ok
    else
      render json: { error: "No se pudo encontrar el libro con el ID proporcionado" }, status: :not_found
    end
  end

  private

  # Método privado para definir los parámetros permitidos para crear o actualizar un libro
  def libro_params
    params.require(:libro).permit(:titulo, :autor_id, :genero_id, :editorial, :año_publicacion, :num_ejemplares)
  end
end
