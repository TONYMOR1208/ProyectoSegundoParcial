class Editorial < ApplicationRecord
  self.table_name = "editorial"
  # Relaciones
  has_many :libros

  # Validaciones
  validates :nombre, presence: true
end
