class Libro < ActiveRecord::Migration[7.1]
  def change
    create_table :libro do |t|
      t.string :titulo
      t.integer :autor_id
      t.integer :genero_id
      t.string :editorial
      t.integer :año_publicacion
      t.integer :num_ejemplares
    end
    add_foreign_key :libro, :autor ,column: :autor_id
    add_foreign_key :libro, :genero ,column: :genero_id
  end
end
