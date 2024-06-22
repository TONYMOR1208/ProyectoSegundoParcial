class Usuario < ActiveRecord::Migration[7.1]
  def change
    create_table :usuario do |t|
      t.string :nombre, limit: 100
      t.string :direccion, limit: 200
      t.string :telefono, limit: 10
      t.string :correo, limit: 100
      t.date :fecha_registro
    end
  end
end
