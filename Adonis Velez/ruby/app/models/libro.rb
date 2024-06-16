class Libro < ApplicationRecord
  self.table_name = "libro"
  # Relaciones
  belongs_to :genero
  belongs_to :editorial
  has_many :prestamos
  has_many :devoluciones, through: :prestamos

  # Validaciones
  validates :titulo, presence: true
  validates :autor, presence: true
  validates :ano_publicacion, numericality: { only_integer: true }
  validates :num_ejemplares, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
