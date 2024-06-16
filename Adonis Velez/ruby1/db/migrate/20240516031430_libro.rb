class Libro < ActiveRecord::Migration[7.1]
  def change
    create_table :libro do |t|
      t.string :titulo, limit: 255
      t.string :autor, limit: 255
      t.integer :genero_id
      t.integer :ano_publicacion
      t.integer :num_ejemplares
      t.integer :editorial_id
      t.timestamps
    end
  add_foreign_key :libro, :genero, column: :genero_id
  add_foreign_key :libro, :editorial, column: :editorial_id
  end
end
