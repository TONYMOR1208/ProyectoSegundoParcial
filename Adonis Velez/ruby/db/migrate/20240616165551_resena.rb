class Resena < ActiveRecord::Migration[7.1]
  def change
    create_table :resena do |t|
      t.integer :libro_id
      t.integer :usuario_id
      t.integer :calificacion
      t.text :comentario
    end
    add_foreign_key :resena, :libro, column: :libro_id
    add_foreign_key :resena, :usuario, column: :usuario_id
  end
end
