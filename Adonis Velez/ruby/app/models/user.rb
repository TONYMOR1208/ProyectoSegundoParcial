class User < ApplicationRecord
  self.table_name = "user"
  require "bcrypt"
  validates :password_hash, presence: true
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
