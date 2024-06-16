class EditorialesController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Acción para crear una nueva editorial
  def create
    editorial = Editorial.new(editorial_params)
    if editorial.save
      render json: { message: "Editorial creada exitosamente" }, status: :created
    else
      render json: { error: "Error al crear la editorial", details: editorial.errors }, status: :unprocessable_entity
    end
  end

  # Acción para mostrar todas las editoriales
  def index
    editoriales = Editorial.all
    render json: editoriales, status: :ok
  end

  # Acción para mostrar los detalles de una editorial específica
  def show
    editorial = Editorial.find_by(id: params[:id])
    if editorial
      render json: editorial, status: :ok
    else
      render json: { error: "No se pudo encontrar la editorial con el ID proporcionado" }, status: :not_found
    end
  end

  # Acción para actualizar la información de una editorial
  def update
    editorial = Editorial.find_by(id: params[:id])
    if editorial.update(editorial_params)
      render json: { message: "Información de la editorial actualizada exitosamente" }, status: :ok
    else
      render json: { error: "Error al actualizar la información de la editorial", details: editorial.errors }, status: :unprocessable_entity
    end
  end

  # Acción para eliminar una editorial
  def destroy
    editorial = Editorial.find_by(id: params[:id])
    if editorial
      editorial.destroy
      render json: { message: "Editorial eliminada correctamente" }, status: :ok
    else
      render json: { error: "No se pudo encontrar la editorial con el ID proporcionado" }, status: :not_found
    end
  end

  private

  # Método privado para definir los parámetros permitidos para crear o actualizar una editorial
  def editorial_params
    params.require(:editorial).permit(:nombre)
  end
end
