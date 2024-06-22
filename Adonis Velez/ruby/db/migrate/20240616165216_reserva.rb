class Reserva < ActiveRecord::Migration[7.1]
  def change
    create_table :reserva do |t|
      t.integer :libro_id
      t.integer :usuario_id
      t.date :fecha_reserva
      t.date :fecha_expiracion
    end
    add_foreign_key :reserva, :libro, column: :libro_id
    add_foreign_key :reserva, :usuario, column: :usuario_id
  end
end
