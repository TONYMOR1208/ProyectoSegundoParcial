class DevolucionesController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Acción para crear una nueva devolución
  def create
    devolucion = Devolucion.new(devolucion_params)
    if devolucion.save
      render json: { message: "Devolución creada exitosamente" }, status: :created
    else
      render json: { error: "Error al crear la devolución", details: devolucion.errors }, status: :unprocessable_entity
    end
  end

  # Acción para mostrar todas las devoluciones
  def index
    devoluciones = Devolucion.all
    render json: devoluciones, status: :ok
  end

  # Acción para mostrar los detalles de una devolución específica
  def show
    devolucion = Devolucion.find_by(id: params[:id])
    if devolucion
      render json: devolucion, status: :ok
    else
      render json: { error: "No se pudo encontrar la devolución con el ID proporcionado" }, status: :not_found
    end
  end

  # Acción para actualizar la información de una devolución
  def update
    devolucion = Devolucion.find_by(id: params[:id])
    if devolucion.update(devolucion_params)
      render json: { message: "Información de la devolución actualizada exitosamente" }, status: :ok
    else
      render json: { error: "Error al actualizar la información de la devolución", details: devolucion.errors }, status: :unprocessable_entity
    end
  end

  # Acción para eliminar una devolución
  def destroy
    devolucion = Devolucion.find_by(id: params[:id])
    if devolucion
      devolucion.destroy
      render json: { message: "Devolución eliminada correctamente" }, status: :ok
    else
      render json: { error: "No se pudo encontrar la devolución con el ID proporcionado" }, status: :not_found
    end
  end

  private

  # Método privado para definir los parámetros permitidos para crear o actualizar una devolución
  def devolucion_params
    params.require(:devolucion).permit(:prestamo_id, :fecha_devolucion)
  end
end
