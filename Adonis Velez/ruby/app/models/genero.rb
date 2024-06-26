class Genero < ApplicationRecord
  self.table_name = "genero"
  # Relaciones
  has_many :libros

  # Validaciones
  validates :nombre, presence: {message: "El nombre del género no puede estar en blanco" },
  length: { maximum: 50, message: "El nombre del género debe tener máximo %{count} caracteres"}
end
