class Devolucion < ActiveRecord::Migration[7.1]
  def change
    create_table :devolucion do |t|
      t.integer :prestamo_id
      t.date :fecha_devolucion
      t.timestamps
    end
    add_foreign_key :devolucion, :prestamo, column: :prestamo_id
  end
end
