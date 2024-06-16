class Devolucion < ApplicationRecord
  self.table_name = "devolucion"
  # Relaciones
  belongs_to :prestamo
  has_one :libro, through: :prestamo
  has_one :usuario, through: :prestamo

  # Validaciones
  validates :fecha_devolucion, presence: true
end
