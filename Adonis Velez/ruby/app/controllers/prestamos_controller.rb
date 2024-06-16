class PrestamosController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Acción para crear un nuevo préstamo
  def create
    prestamo = Prestamo.new(prestamo_params)
    if prestamo.save
      render json: { message: "Préstamo creado exitosamente" }, status: :created
    else
      render json: { error: "Error al crear el préstamo", details: prestamo.errors }, status: :unprocessable_entity
    end
  end

  # Acción para mostrar todos los préstamos
  def index
    prestamos = Prestamo.all
    render json: prestamos, status: :ok
  end

  # Acción para mostrar los detalles de un préstamo específico
  def show
    prestamo = Prestamo.find_by(id: params[:id])
    if prestamo
      render json: prestamo, status: :ok
    else
      render json: { error: "No se pudo encontrar el préstamo con el ID proporcionado" }, status: :not_found
    end
  end

  # Acción para actualizar la información de un préstamo
  def update
    prestamo = Prestamo.find_by(id: params[:id])
    if prestamo.update(prestamo_params)
      render json: { message: "Información del préstamo actualizada exitosamente" }, status: :ok
    else
      render json: { error: "Error al actualizar la información del préstamo", details: prestamo.errors }, status: :unprocessable_entity
    end
  end

  # Acción para eliminar un préstamo
  def destroy
    prestamo = Prestamo.find_by(id: params[:id])
    if prestamo
      prestamo.destroy
      render json: { message: "Préstamo eliminado correctamente" }, status: :ok
    else
      render json: { error: "No se pudo encontrar el préstamo con el ID proporcionado" }, status: :not_found
    end
  end

  private

  # Método privado para definir los parámetros permitidos para crear o actualizar un préstamo
  def prestamo_params
    params.require(:prestamo).permit(:libro_id, :usuario_id, :fecha_prestamo, :fecha_vencimiento)
  end
end
