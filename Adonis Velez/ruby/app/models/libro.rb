class Libro < ApplicationRecord
  self.table_name = "libro"
  # Relaciones
  belongs_to :autor
  belongs_to :genero

  # Validaciones
  validates :titulo, presence: { message: "El título del libro no puede estar en blanco" }
  validates :año_publicacion, numericality: { only_integer: true, message: "El año de publicación debe ser un número entero" }
  validates :num_ejemplares, numericality: { only_integer: true, greater_than_or_equal_to: 0, message: "El número de ejemplares debe ser un número entero mayor o igual a 0" }
end
