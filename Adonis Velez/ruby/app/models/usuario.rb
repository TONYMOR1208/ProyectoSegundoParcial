class Usuario < ApplicationRecord
  self.table_name = "usuario"
  # Relaciones
  has_many :prestamos
  has_many :devoluciones, through: :prestamos

  # Validaciones
  validates :nombre, presence: true
  validates :direccion, presence: true
  validates :telefono, presence: true, length: { is: 10 }
  validates :correo, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
end
