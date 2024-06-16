class Prestamo < ApplicationRecord
  self.table_name = "prestamo"
  # Relaciones
  belongs_to :libro
  belongs_to :usuario
  has_one :devolucion

  # Validaciones
  validates :fecha_prestamo, presence: true
  validates :fecha_vencimiento, presence: true
end
