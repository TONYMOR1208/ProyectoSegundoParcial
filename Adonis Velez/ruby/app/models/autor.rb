class Autor < ApplicationRecord
  self.table_name = "autor"
  # Relaciones
  has_many :libros

  # Validaciones
  validates :nombre,  presence: { message: "El nombre del autor no puede estar en blanco" },
                      length: { maximum: 100, message: "El nombre del autor debe tener máximo %{count} caracteres" }
  validates :bibliografia, presence: { message: "La bibliografía del autor no puede estar en blanco" }
end
