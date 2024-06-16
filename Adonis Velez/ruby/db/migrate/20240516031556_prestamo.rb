class Prestamo < ActiveRecord::Migration[7.1]
  def change
    create_table :prestamo do |t|
      t.integer :libro_id
      t.integer :usuario_id
      t.date :fecha_prestamo
      t.date :fecha_vencimiento
      t.timestamps
    end
    add_foreign_key :prestamo, :libro, column: :libro_id
    add_foreign_key :prestamo, :usuario, column: :usuario_id
  end
end
