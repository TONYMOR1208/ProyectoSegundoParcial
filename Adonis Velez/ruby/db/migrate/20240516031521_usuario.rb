class Usuario < ActiveRecord::Migration[7.1]
  def change
    create_table :usuario do |t|
      t.string :nombre, limit: 255
      t.string :direccion, limit: 255
      t.string :telefono, limit: 10
      t.string :correo, limit: 255
      t.timestamps
    end
  end
end
