class Devolucion < ActiveRecord::Migration[7.1]
  def change
    create_table :devolucion do |t|
      t.integer :prestamo_id
      t.date :fecha_devolucion
      t.string :estado_libro, limit: 100
    end
    add_foreign_key :devolucion, :prestamo, column: :prestamo_id
  end
end
