class Libro < ApplicationRecord
  self.table_name = "libro"
  # Relaciones
  belongs_to :autor
  belongs_to :genero

  # Validaciones
  validates :titulo, presence: true
  validates :año_publicacion, numericality: { only_integer: true }
  validates :num_ejemplares, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
