class User < ApplicationRecord
  require "bcrypt"
  validates :email, presence: true, uniqueness: true
  validates :password_hash, presence: true  # Asegúrate de que se ajuste según tu migración
  validates :username, presence: true, uniqueness: true

  def password
    @password ||= BCrypt::Password.new(password_hash)
  end

  def password=(new_password)
    @password = BCrypt::Password.create(new_password)
    self.password_hash = @password
  end

  def authenticate(password)
    self.password == password
  end
end
