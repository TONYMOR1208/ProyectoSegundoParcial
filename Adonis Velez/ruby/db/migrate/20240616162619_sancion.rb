class Sancion < ActiveRecord::Migration[7.1]
  def change
    create_table :sancion do |t|
      t.integer :usuario_id
      t.date :fecha_inicio
      t.date :fecha_fin
      t.string :descripcion
    end
    add_foreign_key :sancion, :usuario, column: :usuario_id
  end
end
