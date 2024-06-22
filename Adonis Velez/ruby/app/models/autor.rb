class Autor < ApplicationRecord
  self.table_name = "autor"
  # Relaciones
  has_many :libros

  # Validaciones
  validates :nombre, presence: true, length: { maximum: 100 }
  validates :bibliografia, presence: true
end
