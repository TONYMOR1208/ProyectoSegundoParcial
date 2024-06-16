class Genero < ApplicationRecord
  self.table_name = "genero"
  # Relaciones
  has_many :libros

  # Validaciones
  validates :nombre, presence: true
end
